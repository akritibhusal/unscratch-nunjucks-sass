/* gulpfile.js
* 
*/

// Dependencies
const gulp = require("gulp"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    sourcemaps = require("gulp-sourcemaps"),
    browserSync = require("browser-sync").create()
    nunjucks = require('gulp-nunjucks');

// Configurations
var paths = {
    style: {
        src: "./app/sass/**/*.sass",
        dist: "./app/public/css"
    },
    html: {
        src: "./app/views/*.html",
        dist: "./app/public/"
    }
}

// SASS Compile
const sassCompile = ()=> {
    return (
        gulp
            .src(paths.style.src)
            .pipe(sourcemaps.init())
            .pipe(sass())
            .on("error", sass.logError)
            .pipe(postcss([autoprefixer(), cssnano()]))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(paths.style.dist))
            .pipe(browserSync.stream())
    );
}

const njsCompile = () =>
    gulp.src(paths.html.src)
        .pipe(nunjucks.compile({name: 'boilerplate'}))
        .pipe(gulp.dest(paths.html.dist))

// Watch task
// Watches nunjucks
gulp.task('watch', ()=> {
    browserSync.init({
        server: {
            baseDir: "./app/public/" // If server is already running locally set proxy: "loccalserver.link"
        }
    }),
    gulp.watch([paths.html.src], njsCompile),
    gulp.watch([paths.style.src], sassCompile),
    gulp.watch(paths.html.dist).on('change', browserSync.reload)
});

gulp.task('default', gulp.parallel('watch'))