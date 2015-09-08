var express = require("express");
var ElasticSearch = require("elasticsearch");
var geoip = require("geoip-lite");
var elasticSearch;

module.exports = searchRoute;

function searchRoute(config, index, types) {

    elasticSearch = new ElasticSearch.Client({
        host: config.elastic.host + ":" + config.elastic.port,
    });
    //temp until we can handle mutlipe indexes
    var type = typeof types == "Array" ? types[0] : types;
    var route = express.Router({})
        .get("/geo-filter", geoFilter(index, type));

    return route;
}

function geoFilter(index, type) {

    return function(req, res, next) {

        var lat, lon;

        if (!(req.query.lat && req.query.lon)) {
            var geo = geoip.lookup(req.ip);
            console.log("ip", req.ip, "geo-results", geo);
            if (!geo) {
                res.status(400).json({
                    error: "Must supply lat & lon couldn't determine ip"
                }).end();
                return;
            }
            lat = geo.ll[0];
            lon = geo.ll[1];

        } else {
            lat = req.query.lat;
            lon = req.query.lon;
        }

        var unit = req.query.unit || "mi";
        var distance = req.query.distance || "30mi";
        var query = {
            index: index,
            type: type,
            body: {
                "from": req.query.from || 0,
                "size": "10",
                "query": {
                    "filtered": {
                        "filter": {
                            "geo_distance": {
                                "distance": distance,
                                "unit": unit,
                                "location": {
                                    "lat": lat,
                                    "lon": lon
                                }
                            }
                        }
                    }
                },
                "sort": [{
                    "_geo_distance": {
                        "location": {
                            "lat": lat,
                            "lon": lon
                        },
                        "order": "asc",
                        "unit": unit,
                        "mode": "min",
                        "distance_type": "sloppy_arc"
                    }
                }]
            }
        }
        console.log(query);
        elasticSearch.search(query).then(function(results) {
            console.log("return count:", results.hits.hits.length);
            res.json(results.hits.hits).end();
        }, function(err) {
            console.error(err);
            res.status(500).json(err).end();
        });
    }
}
