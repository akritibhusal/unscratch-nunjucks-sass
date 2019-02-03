// gulpfile.js
var gulp = require("gulp"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    sourcemaps = require("gulp-sourcemaps"),
    browserSync = require("browser-sync").create();

var paths = {
    style: {
        src: "app/sass/**/*.sass",
        dest: "app/css"
    },
    html: {
        src: "app/views/",
        dest: "app/html/**/*.html"
    }
}

function style() {
    return (
        gulp
            .src(paths.style.src)
            .pipe(sourcemaps.init())
            .pipe(sass())
            .on("error", sass.logError)
            .pipe(postcss([autoprefixer(), cssnano()]))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(paths.style.src))
            .pipe(browserSync.stream())
    );
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./app" // if already serving locally, proxy: "localserver.link"
        }
    });
    gulp.watch(paths.style.src, style);
    gulp.watch(paths.html.dest).on('change', browserSync.reload);
}
exports.style = style;
exports.watch = watch;