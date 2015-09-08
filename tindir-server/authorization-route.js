var express = require("express");
var passport = require("passport");
var FacebookStrategy = require("passport-facebook");
var UserResource = require("./user-resource");
var FacebookResource = require("./facebook-resource");
///////////

var userResource;
var facebookResource;

module.exports = authorizationRoute;

function authorizationRoute(config) {

    userResource = new UserResource(config.couchdb);
    facebookResource = new FacebookResource({});
    passport.use(new FacebookStrategy({
        clientID: "1609257382674983",
        clientSecret: "08840d7f39668f53a74cd5371956ec4b",
        callbackURL: "http://localhost/api/auth/facebook/callback",
        profileFields: [
            'id',
            'displayName',
            'link',
            'photos',
            'email',
            'age_range',
            'address',
            'birthday',
            'bio',
            'about',
            'location'
        ]
    }, verifyFacebook));

    var route = express.Router({})
        .get("/facebook", passport.authenticate('facebook', {
            scope: ['email', 'public_profile']
        }))
        .get("/facebook/callback",
            passport.authenticate('facebook', {
                scope: ['email', 'public_profile'],
                successRedirect: '/',
                failureRedirect: '/signin'
            })
        )

    return route;
}

function verifyFacebook(accessToken, refreshToken, profile, done) {

    for (var key in profile) {
        if (/(_)/g.test(key)) {
            var newkey = key.replace("_", '');
            profile[newkey] = profile[key];
            delete this[key];
        }
    }

    userResource.findOrCreate(profile.id, profile, function(err, user) {

        if (err) {
            console.log(err);
            done(err);
            return;
        } else {
            console.log("user id: ", user._id);
            done(null, user);
            return;
        }
    });
}

function verifiedFacebook(req, res, next) {

    console.log("user has been verified!");
    console.log("session:", req.session);
    res.redirect("/");
}
