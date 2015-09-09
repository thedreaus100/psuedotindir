var Resource = require("./resource");
var util = require("util");

function UserResource(config) {

    var _self = this;
    Resource.call(_self, config);

    _self.findOrCreate = findOrCreate;
    _self.findUserById = findUserById;
    _self.updateUser = updateUser;

    //////////

    function findOrCreate(userid, data, callback) {

        //should actually be find create or update!!!
        findUserById(userid, function(err, response) {

            if (err) callback(err, null);
            else {
                console.log("updating or creating user!");
                updateUser(userid, data, callback);
            }
        })
    }

    function findUserById(userid, callback) {

        var path = config.database + "/" + userid;
        _self.get(path, {}, function(err, response) {

            if (err) callback(err, null);
            else {
                console.log("retrieving user: ", userid);
                console.log("retrieved user: ", response.error ? "user doesn't exist" : response.id);
                callback(null, response.error ? null : response);
            }
        });
    }

    function updateUser(userid, data, callback) {

        var path = config.database + "/_design/user/_update/all/" + userid;
        console.log("updating user: ", userid);
        _self.put(path, data, function(err, response) {

            if (err) callback(err);
            else if (response.doc) {
                callback(null, response.doc);
            } else {
                callback(new Error("failed to create user"), null);
            }
        });
    }
}

util.inherits(UserResource, Resource);

module.exports = UserResource;
