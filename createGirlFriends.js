var fs = require("fs");
var path = require("path");
var uuid = require("node-uuid");
var async = require("async");
var geocoder = require("geocoder");
var readline = require("readline");

///////////

var img_dir = "src/assets/user-images";
var user_dir = "couchdb/users";
var interests = [
    "art",
    "music",
    "dance",
    "sports",
    "film",
    "finance",
    "movies",
    "skydiving",
    "programming"
]
var first_names = [
    "ashley",
    "brittany",
    "sarah",
    "rebecca",
    "kim",
    "sally",
    "danielle",
    "jessica",
];

var last_names = [
    "marshall",
    "jones",
    "smith",
    "black",
    "khardashian",
    "angular",
    "java"
];

createGirlFriends(img_dir);

function createGirlFriends(dir) {

    async
    .waterfall([
        async.apply(getLocation, readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })),
        async.apply(dumpOldGirlFriends, user_dir),
        async.apply(readImages, img_dir),
        makeNewGirlFriends
    ], function(err, result) {
        if (err) console.error(err);
        else console.log("completed: ", result);
        return process.exit();
    });
}

function getLocation(readlineInterface, callback) {

    var msg = "Where do you want your girlfriends to live?: ";
    _prompt(msg);

    function _prompt() {
        readlineInterface.question(msg, function(address) {
            console.log(address);
            geocoder.geocode(address, function(err, data) {
                if (data && data.results.length > 0) {
                    location = {
                        lat: data.results[0].geometry.location.lat,
                        lon: data.results[0].geometry.location.lng
                    }
                    callback(null, location);
                } else {
                    var msg = "We couldn't recognize that location please try again!";
                    _prompt(msg);
                }
            });
        });
    }
}

//Should dump them from the database as well...
//...Do later
function dumpOldGirlFriends(dir, location, callback) {

    console.log("dumping all of your old girlfriends!");
    fs.readdirSync(dir).map(function(file) {
        return fs.unlinkSync(path.join(dir, file));
    });
    console.log("dumped all of your old girlfriends");
    callback(null, location);
}

function readImages(dir, location, callback) {

    var files = fs.readdirSync(dir).filter(function(file) {

        return /.(jpg|png|jpeg)/g.test(file);
    }).map(function(file) {
        //These will actually be used as url's not actually going to read the files
        return dir + "/" + file;
    });
    callback(null, files, location);
}

function makeNewGirlFriends(images, location, callback) {

    async.each(images,
        function(image, callback) {
            makeGirlFriend(image, location, callback);
        },
        function(err) {
            if (err) callback(err);
            else callback(null, "done!");
        });
}

function makeGirlFriend(image, location, callback) {

    //console.log("girlfriend: ", image);
    var first_name = first_names[Math.floor(Math.random() * first_names.length)];
    var last_name = last_names[Math.floor(Math.random() * last_names.length)];
    var _id = uuid.v1();
    var date = new Date();

    var _interests = interests.slice(0);
    var num = Math.floor(Math.random() * _interests.length + 1);
    while (_interests.length > num) {
        var index = Math.floor(Math.random() * _interests.length);
        console.log("index: ", index);
        _interests.splice(index, 1);
    }

    var girlfriend = {

        _id: _id,
        id: _id,
        displayName: first_name.concat(" " + last_name),
        name: {
            first_name: first_name,
            last_name: last_name
        },
        date_modified: date,
        date_created: date,
        photos: [{
            value: image
        }],
        location: {
            lat: location.lat + Math.random() * .1 * (Math.floor(Math.random() * 2 + 1) == 2 ? 1 : -1),
            lon: location.lon + Math.random() * .10 * (Math.floor(Math.random() * 2 + 1) == 2 ? 1 : -1)
        },
        interests: _interests,
        user: true
    }

    //Should be in a seperate method
    var file_path = path.join(user_dir, _id + ".json");
    fs.writeFile(file_path, JSON.stringify(girlfriend), {
        encoding: "utf8"
    }, function(err, response) {

        if (err) callback(err);
        else {
            console.log("created: ", girlfriend.displayName, girlfriend.location);
            callback(null);
        }
    });
}
