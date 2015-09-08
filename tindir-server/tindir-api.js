var express = require("express");
var authAPI = require("./authorization-route");
var userAPI = require("./user-route");

module.exports = apiRoute;

function apiRoute(config) {

    var route = express.Router({})
        .use("/auth", authAPI(config))
        .use("/user", userAPI(config));

    return route;
}
