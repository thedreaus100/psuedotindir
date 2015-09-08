/*
    dependencies
*/
var express = require("express");
var domain = require("domain");
var session = require("express-session");
var uuid = require("node-uuid");
var RedisStore = require("connect-redis")(session);
var bodyParser = require("body-parser");
var stylus = require("stylus");
var passport = require("passport");
var path = require("path");

/*Routes*/
var tindirAPI = require("./tindir-api.js");

/*
    Local Dependencies
*/
var UserResource = require("./user-resource");
/*
    declarations
*/
var buffer;

/*
    Export
*/
module.exports = createServer;

/*
    Meat & Potatos
*/
function createServer(config) {

    if (!config) config = {};

    console.log("Creating Psuedo-Tindir Server...");

    buffer = new Buffer(config);

    //serialize session user
    var userResource = new UserResource(config.couchdb);
    passport.serializeUser(function(user, done) {
        console.log("serializing user!", user.id);
        done(null, user.id);
    });

    //deserialize session user
    passport.deserializeUser(function(id, done) {
        console.log("deserializing user!", id);
        ///should actually use redis to store to this info!
        userResource.findUserById(id, function(err, user) {
            if (err) {
                done(err, null);
            } else {
                done(null, user);
            }
        });
    });

    var server = express()
        .use(domainWare)
        .use(session({
            genid: function(req) {
                var sid = uuid.v1();
                return sid;
            },
            secret: 'keyboard cat',
            resave: true,
            saveUninitialized: false,
            store: config.redis ?
                new RedisStore({
                    host: config.redis.host,
                    port: config.redis.port
                }) : new RedisStore()
        }))
        .use(passport.initialize())
        .use("/api", tindirAPI(config))
        .use(stylus.middleware(path.join(__dirname, "/")))
        .use(express.static(path.join(__dirname, "/")))

    createStaticMappings(server, config.static_mappings);

    return server;
}

function domainWare(req, res, next) {

    var requestDomain = domain.create();
    requestDomain.add(req);
    requestDomain.add(res);
    requestDomain.on("error", function(err) {

        console.error("Unhandled error", err.stack);
        //should do some minor error diagnoses to see if the child should stay active!
        res.status(500).json("Oops you managed to somehow crash the server...").end();
    });

    next();
}

function createStaticMappings(server, mappings) {

    for (var mi in mappings) {

        var mapping = mappings[mi];
        server
            .use(mapping.route, stylus.middleware(path.join("", mapping.endpoint)))
            .use(mapping.route, express.static(path.join("", mapping.endpoint)));
    }
}
