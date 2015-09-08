var http = require("http");
var fs = require("fs");
var async = require("async");
var wrench = require('wrench');
var path = require("path");
var querystring = require("querystring");
var ElasticSearch = require("elasticsearchclient");
var concat = require("concat-stream");
var _ = require("underscore");
/*Local Dependencies*/
var request = require("./tindir-server/http-resource").request;
//////////////
var defaultJSON = "server-config/default.json";
var couchdbDir = "couchdb";

activate();

function activate() {

    var processes = [
        //Reads Database Configuration
        async.apply(fs.readFile, process.argv[2] || defaultJSON),
        //Converts Response to JSON...
        getJSON,
        //Creates Mapping For ElasticSearch
        createElasticMapping,
        //Creates the database if it doesn't already exist
        createCouchDatabase,
        //Reads all the json documents in the couchdb folder
        readDocumentFiles,
        //Tries to retrieve the documents
        getDatabaseDocs,
        //If the documents already exist on the server update their revisions
        updateDocRevisions,
        //Send request to update all docs!
        couchdbBulkUpdate,
        //Send request to update all docs in ElastSearch!
        elasticBulkUpdate,
        //create river... the previous part is optional since the last part will create
        //a river between the two anyways
        //createRiver
    ];

    async.waterfall(processes, function(err, response) {

        if (err) console.error("Something went wrong", err);
        else {
            console.log("final response: ", response);
        }
    });
}

function readDocumentFiles(config, callback) {

    console.log("imported config");
    var docs = wrench
        .readdirSyncRecursive(couchdbDir)
        .filter(function(file) {
            return (/\.(json)$/i).test(file);
        })
        .map(function(file) {
            var filepath = path.join(couchdbDir, file);
            var data = fs.readFileSync(filepath);
            try {
                return JSON.parse(data);
            } catch (err) {
                return null;
            }
        });

    callback(null, config, docs);
    /*
    //callback(null, filepath, config);
    process.nextTick(function() {

        console.log(files);
        async.each(
            files,
            function(file, callback) {
                console.log("loading document....", file);
                loadDocument(file, config, callback);
            },
            function(err) {
                console.log(err);
                console.log("all files uploaded!");
                if (err) return callback(err);
                return callback(null, "success");
            });
    });
    */
}

function getDatabaseDocs(config, docs, callback) {

    if (!config || !config.couchdb) return callback(new Error("config not defined somehow!"));

    var ids = docs.map(function(doc) {
        return "\"" + doc._id + "\"";
    });
    console.log("document ids: ", ids);
    var path = config.couchdb.database + "/" + "_all_docs";

    querystring.escape = function(raw) {
        return raw;
    };

    var query = querystring.stringify({
        keys: "[" + ids.toString() + "]"
    });
    path += "?" + query;
    request(config.couchdb, path, "GET", null, false, function(err, response) {

        if (err || !response) return callback(err, null);
        else {
            if (response.rows) {
                callback(null, config, docs, response.rows);
            } else {
                callback(new Error("unexpected request!"), null);
            }
        }
    });
}

function updateDocRevisions(config, docs, server_docs, callback) {

    var updated_docs = docs.map(function(doc, index) {

        var server_doc = server_docs[index];
        //There is no previous document
        if (!server_doc.value) {
            return doc;
        }
        //Previous document exists but the stored document is up to date.
        else if (doc._rev && doc._rev == server_doc.value._rev) {
            return null;
        }
        //stored document is out of date update revision
        else {

            doc._rev = server_doc.value.rev;
            return doc;
        }
    });

    callback(null, config, updated_docs);
}

function couchdbBulkUpdate(config, docs, callback) {

    console.log("preparing bulk update...");
    var doc = {
        docs: docs
    }

    var path = config.couchdb.database + "/_bulk_docs";
    request(config.couchdb, path, "POST", doc, false, function(err, repsonse) {
        if (err) callback(err);
        else callback(null, config, docs);
    });
}

function elasticBulkUpdate(config, docs, callback) {

    var elasticSearch = new ElasticSearch(config.elastic);
    var commands = [];

    ////////////

    _.each(docs, function(item, index) {

        if (!/(_)/g.test(item._id)) {
            commands.push({
                "index": {
                    "_index": config.elastic.default_index,
                    "_type": "user",
                    "_id": item._id
                }
            });
            delete item._id;
            commands.push(item);
        }
    });

    console.log(commands);

    elasticSearch
        .bulk(commands, {})
        .on('data', function(data) {
            console.log("Elastic Response: ", data);
            callback(null, config);
        })
        .on("error", function(error) {
            callback(err, null);
        })
        .exec();
}

/*
    Synchronous loading was causing error,
    would rather do a bulk update anyways
*/
function loadDocument(file, config, parent_callback) {

    console.log("loading document: ");
    var processes = [
        function(callback) {

            console.log("file:", file);
            return callback(null, file, {
                encoding: "utf8"
            });
        },
        fs.readFile,
        getJSON,
        function(doc, callback) {
            return callback(null, config, doc);
        },
        updateRev,
        saveDoc
    ];

    return async.waterfall(processes, function(err, dbresponse, config) {

        if (err) parent_callback(err);
        else {
            console.log("database response: ", dbresponse);
            //return parent_callback(null);
            return;
        }
    });
}

function getJSON(raw, callback) {

    var config;
    try {
        config = JSON.parse(raw.toString());
    } catch (err) {
        callback(err);
        return;
    }

    return callback(null, config);
}

function createRiver(config, callback) {

    /*Add Filter to Only Grab Users*/
    console.log("creating river between couchdb and elasticsearch");
    var elasticSearch = new ElasticSearch(config.elastic);
    var riverData = {
        "type": "couchdb",
        "couchdb": {
            "host": config.couchdb.host,
            "port": config.couchdb.port,
            "db": config.couchdb.database,
            "filter": null
        },
        "index": {
            "index": config.elastic.default_index,
            "type": "user",
            "bulk_size": "100",
            "bulk_timeout": "10ms"
        }
    }

    elasticSearch.createOrModifyRiver("couchdb", riverData, {})
        .on("data", function(data) {
            console.log("river response:", data);
            callback(null, config);
        })
        .on("error", function(err) {
            callback(err);
        }).exec();
}

function createElasticMapping(config, callback) {

    var mapping = {
        "mappings": {
            "user": {
                "properties": {
                    "location": {
                        "type": "geo_point",
                        "lat_lon": true
                    },
                    "interests":{
                        "type":"multi_field",
                        "fields":{
                            "interests":{
                                "type":"string",
                                "index":"analyzed"
                            },
                            "raw_interests":{
                                "type":"string",
                                "index":"not_analyzed"
                            }
                        }
                    }
                }
            }
        }
    }

    var path = config.elastic.default_index;
    console.log("creating mapping for: ", path);
    request(config.elastic, path, "PUT", mapping, null, function(err, response) {

        if (err) callback(err);
        //Process Mapping
        else {
            console.log("ElasticSearch Response: ", response);
            callback(null, config)
        };
    });
}

function createCouchDatabase(config, callback) {

    if (!config.couchdb) {
        return callback(new Error("no couchdb configuration found"));
    }

    console.log("attempting to create database using configuration: ");
    var path = config.couchdb.database;
    request(config.couchdb, path, "PUT", null, false, function(err, response) {

        if (err || !response) return callback(err, null);
        else if (!response.error || response.error == "file_exists")
            return callback(null, config);
        else return callback(response.error);
    });
}

function saveDoc(config, doc, callback) {

    if (!config.couchdb) {
        return callback(new Error("no couchdb configuration found"));
    }

    var path = config.couchdb.database + "/" + doc._id;
    console.log("attempting to save doc: ", doc._id);
    request(config.couchdb, path, "PUT", doc, false, function(err, response) {
        if (err) return callback(err);
        else return callback(null, response, config);
    });
}

function updateRev(config, doc, callback) {

    if (!config || !config.couchdb) {
        return callback(new Error("no couchdb configuration found"));
    }

    var path = config.couchdb.database + "/" + doc._id;
    request(config.couchdb, path, "GET", null, function(err, response) {

        if (err) return callback(err);
        else {
            if (response._rev) doc._rev = response._rev;
            return callback(null, config, doc);
        }
    });
}
