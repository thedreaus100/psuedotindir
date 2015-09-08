var http = require("http");
var os = require("os");
var cluster = require("cluster");
var domain = require("domain");
var fs = require("fs");
var tindirServer = require("./tindir-server");

var configFile = process.argv[2] || "server-config/default.json";

activate(configFile);

//////////////////////

function activate(configFile) {

    console.log("Running Master");
    fs.readFile(configFile, {
        encoding: "utf8"
    }, function(err, config) {

        if (err) return console.error("File Not Found");

        try {
            config = JSON.parse(config);
        } catch (parseErr) {
            return console.error("Invalid File Format");
        }

        spawn(config);
    });
}

function spawn(config) {

    if (cluster.isMaster) {

        for (var i = 0; i < os.cpus().length; i++) forkChild();

        cluster.on("disconnect", function(worker) {

            forkChild();
        });

    } else {

        runChildServer(80, config);
    }
}

//Fork Child Process
function forkChild() {

    var mem = Number(os.freemem() / os.totalmem());
    if (mem > 0) cluster.fork();
    else console.log("memory is too high!");
    //Possibly monitor memory usage to increase and decrease children to keep the system running
}

function runChildServer(port, config) {

    var server;
    var workerDomain = domain.create()
        .on("error", function(err) {

            try {

                console.error("Something you did crashed the server...thanx \n", err.stack);
                server.close();
                console.log("Disconnecting worker: ", cluster.worker.id);
                if (cluster.worker.isConnected()) cluster.worker.disconnect(); //Add Callback

            } catch (workerErr) {
                console.error("Problem disconnecting worker \n", workerErr.stack);
            }
        })
        .run(function() {
            server = http.createServer(tindirServer(config)).listen(port, '0.0.0.0');
        });
}
