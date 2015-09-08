var Resource = require("./resource");
var util = require("util");

function FacebookResource(config) {

    var _self = this;
    if (!config) config = {};
    config.host = "graph.facebook.com";
    config.port = 443;

    Resource.call(_self, config);

    _self.getLocation = getLocation;

    //////////

    function getLocation(userid, access_token, callback) {

        var path = "me";
        var query = {
            fields: "address",
            access_token: access_token
        }

        _self.get(path, query, true, callback);
    }

}

util.inherits(FacebookResource, Resource)


module.exports = FacebookResource;
