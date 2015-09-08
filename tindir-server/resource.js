var httpResource = require("./http-resource");

module.exports = Resource;

function Resource(config) {

    var _self = this;
    _self.config = config;
    _self.get = _get;
    _self.post = _post;
    _self.put = _put;
    _self.del = _del;

    function _get(path, query, secure, callback) {
        httpResource.get(_self.config, path, query, secure, callback);
    }

    function _post(path, data, secure, callback) {
        httpResource.post(_self.config, path, data, secure, callback)
    }

    function _put(path, data, secure, callback) {
        httpResource.put(_self.config, path, data, secure, callback)
    }

    function _del(path, data, secure, callback) {
        httpResource.del(_self.config, path, data, secure, callback)
    }
}
