var http = require("http");
var https = require("https");
var concat = require("concat-stream");
var querystring = require("querystring");

module.exports = {

    get: get,
    post: post,
    put: put,
    del: del,
    request: request,
    getHttpRequest: getHttpRequest
}

function get(config, path, query, secure, callback) {

    querystring.escape = function(query) {
        return query;
    }

    var _query = querystring.stringify(query);
    if (query) path += "?" + _query
    request(config, path, "GET", null, secure, callback);
}

function post(config, path, data, callback) {
    request(config, path, "POST", data, secure, callback)
}

function put(config, path, data, callback) {
    request(config, path, "PUT", data, secure, callback)
}

function del(config, path, data, callback) {
    request(config, path, "DELETE", data, secure, callback)
}

function request(config, path, method, data, secure, callback) {

    getHttpRequest(config, path, method, secure, callback)
        .end(JSON.stringify(data || {}));
}

function getHttpRequest(config, path, method) {

    config = arguments[0];
    path = arguments[1];
    method = arguments[2];

    if (typeof arguments[3] === "function") {
        secure = false;
        callback = arguments[3];
    } else {
        secure = arguments[3];
        callback = arguments[4];
    }

    var h;
    if (secure) h = https;
    else h = http;

    return h
        .request({
            method: method.toUpperCase(),
            host: config.host,
            port: config.port,
            path: "/" + path,
            headers:config.headers || {
                "content-type":"application/json"
            }

        }, function(response) {

            response
                .setEncoding("utf-8")
                .on("error", handleError)
                .pipe(concat(function(body) {

                    var result;
                    try {
                        result = JSON.parse(body);
                    } catch (err) {
                        callback(new Error("Unexpected Response From The Database"));
                    }

                    callback(null, result);
                }));

        })
        .on("error", handleError);

    function handleError(err) {
        callback(err);
    }
}
