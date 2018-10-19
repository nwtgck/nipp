var gulp = require("gulp");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var karma = require("karma").server;
var jasmine = require("gulp-jasmine");
var jasmineNode = require("gulp-jasmine-node");

gulp.task("default", ["minify", "test"]);

gulp.task("minify", function() {
    gulp
        .src("ua-device-detector.js")
        .pipe(uglify())
        .pipe(concat("ua-device-detector.min.js"))
        .pipe(gulp.dest("."));
});

/**
 * Run test once and exit
 */
gulp.task("test", ["test-client", "test-server"]);

gulp.task("test-client", function(done) {
    karma.start(
        {
            configFile: __dirname + "/karma.conf.js"
        },
        done
    );
});

gulp.task("test-server", function() {
    return gulp.src("test/server.js").pipe(jasmineNode());
});

gulp.task("watch", [], function() {
    gulp.watch(["**/*.js"], ["test", "minify"]);
});

gulp.task("debug-chrome", function(done) {
    karma.start(
        {
            configFile: __dirname + "/karma.conf.js",
            browsers: ["ChromeDebugging"],
            singleRun: false,
            autoWatch: true
        },
        done
    );
});

gulp.task("debug-phantom", function(done) {
    karma.start(
        {
            configFile: __dirname + "/karma.conf.js",
            browsers: ["PhantomJSDebugging"],
            singleRun: false,
            autoWatch: true
        },
        done
    );
});
