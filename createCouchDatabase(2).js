var http = require("http");
var fs = require("fs");
var async = require("async");
var wrench = require('wrench');
var path = require("path");

/*Local Dependencies*/
var request = require("./tindir-server/http-resource").request;
//////////////
var defaultJSON = "server-config/default.json";
var couchdbDir = "couchdb";

activate();

function activate() {

    var processes = [
        getFileLocation,
        fs.readFile,
        getJSON,
        createDatabase,
        uploadData
    ];

    async.waterfall(processes, function(err, response, config) {

        if (err) console.error("Something went wrong", err);
        else {
            console.log("final response: ", response);
            if (!response.error || response.error == "file_exists")
                console.log("done: ", response);
            else console.error("database error", new Error(response.error));
        }
    });
}

function uploadData(config, callback) {

    var files = [];
    console.log("config: ", config);
    wrench
        .readdirSyncRecursive(couchdbDir)
        .filter(function(file) {
            return (/\.(json)$/i).test(file);
        })
        .map(function(file) {
            var filepath = path.join(couchdbDir, file);
            files.push(filepath);
        });

    //callback(null, filepath, config);
    process.nextTick(function() {

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
}

function loadDocument(file, config, parent_callback) {

    console.log("loading document: ", file);
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

    async.waterfall(processes, function(err, dbresponse, config) {

        if (err) parent_callback(err);
        else {
            console.log("database response: ", dbresponse);
            console.log("parent_callback", parent_callback);
            return parent_callback(null);
        }
    });
}

function getFileLocation(callback) {

    return callback(null, process.argv[2] || defaultJSON, {
        encoding: "utf8"
    });
}

function getJSON(raw, callback) {

    var config;
    try {
        config = JSON.parse(raw.toString());
        console.log('read config file');
    } catch (err) {
        callback(err);
        return;
    }

    return callback(null, config);
}

function createDatabase(config, callback) {

    if (!config.couchdb) {
        return callback(new Error("no couchdb configuration found"));
    }

    console.log("attempting to create database: ", config.couchdb.database);
    var path = config.couchdb.database;
    console.log(config.couchdb);
    request(config.couchdb, path, "PUT", null, function(err, response) {

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
    console.log("attempting to save doc: ", doc);
    request(config.couchdb, path, "PUT", doc, function(err, response) {
        if (err) return callback(err);
        else return callback(null, response, config);
    });
}

function updateRev(config, doc, callback) {

    if (!config || !config.couchdb) {
        return callback(new Error("no couchdb configuration found"));
    }

    var path = config.couchdb.database + "/" + doc._id;
    console.log(path);

    request(config.couchdb, path, "GET", null, function(err, response) {

        if (err) return callback(err);
        else {
            if (response._rev) doc._rev = response._rev;
            return callback(null, config, doc);
        }
    });
}
