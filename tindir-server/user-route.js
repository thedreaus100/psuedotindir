var express = require("express");
var UserResource = require("./user-resource");
var searchAPI = require("./search-route");
var bodyParser = require("body-parser");

module.exports = userRoute;

var userResource;
var FORBIDDEN = "Must be logged in to perform this action";
var NOT_FOUND = "User does not exist"

function userRoute(config) {

    userResource = new UserResource(config.couchdb);
    var route = express.Router({})
        .param("id", extractid)
        .use("/search", searchAPI(config, config.elastic.default_index, "user"))
        .get("/me", retrieveSessionUser)
        .get("/:id", retrieveUserById)
        .put("/:id",
            bodyParser.json(),
            updateUser
        )
        .post("/:id",
            bodyParser.json(),
            updateUser
        );

    return route;
}

function extractid(req, res, next, id) {
    req.id = id;
    console.log("id:", req.id);
    next();
}

function retrieveSessionUser(req, res, next) {

    var userid;
    try {
        //should actually validate facebook session!
        userid = req.session.passport.user;
        console.log("userid:", userid);
        userResource.findUserById(userid, function(err, user) {
            console.log("me:", user.id);
            if (err) res.status(401).end();
            else res.json(user).end();
        });
    } catch (err) {
        res.status(401).json().end();
    }
}

function retrieveUserById(req, res, next) {

    var userid = req.id;
    userResource.findUserById(userid, function(err, user) {
        console.log(user);
        if (err) res.status(404).json({
            error: NOT_FOUND
        }).end();
        else res.json(user).end();
    });
}

function updateUser(req, res, next) {

    try {
        if (req.id != req.session.passport.user) throw new Error();
        console.log(req.session.passport.user);
    } catch (err) {
        return res.status(401).json({
            error: FORBIDDEN
        });
    }

    userResource.updateUser(req.id, req.body, function(err, response) {
        if (err) res.status(500).json({
            error: "update failed"
        }).end();
        else {
            console.log("update was successfull");
            res.json({
                msg: "successfully updated user"
            });
        }
    });
}
