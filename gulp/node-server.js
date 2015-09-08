var gulp = require("gulp");
var gls = require("gulp-live-server");
var conf = require('./conf');

gulp.task('node-serve', ['watch'], function() {
    //1. run your script as a server
    var server = gls.new('index.js');
    server.start();

    gulp.watch('index.js', server.start.bind(server)); //restart my server
});
