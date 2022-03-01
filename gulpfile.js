"use strict"
const $ = require("gulp-load-plugins")(),
    gutil = require("gulp-util"),
    browserSync = require("browser-sync").create(),
    gulp = require("gulp"),
    sass = require('gulp-sass')(require('sass')),
    postcss = require("gulp-postcss"),
    pcimport = require("postcss-import"),
    pcssshort = require("postcss-short"),
    pcssfbf = require("postcss-flexbugs-fixes"),
    autoprefixer = require("autoprefixer")({
        grid: "autoplace",
        flexbox: true,
    }),
    cssnano = require("cssnano"),
    sortmq = require("postcss-sort-media-queries")(),
    sourcemaps = require("gulp-sourcemaps"),
    ftp = require("vinyl-ftp"),
    mode = require("gulp-mode")({
        modes: ["production", "development"],
        default: "development",
        verbose: false,
    })

let process = require("child_process"),
    connectionSettings = require("./accesses/accesses.js")

const postCssDev = [pcssshort, pcssfbf, pcimport]
const postCssBuild = [pcssshort, pcssfbf, sortmq, autoprefixer, cssnano, pcimport]

const templatePath = connectionSettings.server.path
const remotePathCss = templatePath + "css",
    remotePathJs = templatePath + "js",
    remotePathImg = templatePath + "img"

const xpager_conn = ftp.create({
    host: connectionSettings.xpager.host,
    user: connectionSettings.xpager.user,
    password: connectionSettings.xpager.password,
    parallel: 4,
    log: gutil.log,
})

const server_conn = ftp.create({
    host: connectionSettings.server.host,
    user: connectionSettings.server.user,
    password: connectionSettings.server.password,
    parallel: 4,
    log: gutil.log,
})

gulp.task("browser-sync", () => {
    browserSync.init({
        server: {
            baseDir: "docs",
        },
        notify: false,
    })

    browserSync.watch(["docs/css/*.css", "docs/js/**/*.js", "docs/*.html"]).on("change", browserSync.reload)
})

gulp.task("postcss", (_) =>
    gulp
        .src(["src/sass/**/*.sass"])
        .pipe(mode.development(sourcemaps.init()))
        .pipe(sass().on("error", sass.logError))
        .pipe(mode.development(postcss(postCssDev)))
        .pipe(mode.production(postcss(postCssBuild)))
        .pipe(mode.development(sourcemaps.write()))

        .pipe(gulp.dest("docs/css")),
)

gulp.task("pug", (_) =>
    gulp
        .src("src/pug/pages/*.pug")
        .pipe($.pug({ pretty: true }))
        .pipe(gulp.dest("docs")),
)

gulp.task("move:fonts", (_) => gulp.src("src/fonts/**/*").pipe(gulp.dest("docs/fonts")))

gulp.task("move:img", (_) => gulp.src("src/img/**/*").pipe(gulp.dest("docs/img")))

gulp.task("imagemin", () =>
    gulp
        .src(["src/img/**/*"], { since: gulp.lastRun("imagemin") })
        .pipe(
            $.cache(
                $.imagemin(
                    [
                        $.imagemin.jpegtran({
                            progressive: true,
                        }),
                        require("imagemin-jpeg-recompress")({
                            loops: 2,
                            min: 80,
                            max: 90,
                            quality: "high",
                        }),
                        $.imagemin.svgo(),
                        $.imagemin.optipng({ optimizationLevel: 2 }),
                        //   require("imagemin-pngquant")({quality: '75-85', speed: 5})
                    ],
                    {
                        verbose: true,
                    },
                ),
            ),
        )
        .pipe(gulp.dest("docs/img")),
)

gulp.task("deploy:css", () => gulp.src("docs/css/*.*", { since: gulp.lastRun("postcss") }).pipe(server_conn.dest(remotePathCss)))

gulp.task("deploy:js", () => gulp.src("docs/js/*.*", { since: gulp.lastRun("deploy:js") }).pipe(server_conn.dest(remotePathJs)))

gulp.task("deploy:img", () => gulp.src("docs/img/**/*", { since: gulp.lastRun("deploy:img") }).pipe(server_conn.dest(remotePathImg)))

gulp.task("deploy:docs", (_) => gulp.src("docs/**/*.*", { buffer: false }).pipe(xpager_conn.dest(connectionSettings.xpager.dirName)))

const local = (_) => {
        gulp.watch(["src/sass/**/*.sass"], gulp.series("postcss"))
        gulp.watch("src/pug/**/*", gulp.series("pug"))
        gulp.watch("src/img/**/*", gulp.series("imagemin"))
    },
    watch = (_) => {
        gulp.watch("docs/css/**/*", gulp.series("deploy:css"))
        gulp.watch("docs/js/*.js", gulp.series("deploy:js"))
        gulp.watch("docs/img/**/*", gulp.series("deploy:img"))
    },
    wpDev = (_) => {
        process.exec("npm run wp-dev")
    },
    wpBuild = (_) => {
        process.exec("npm run wp-build")
        _()
    },
    wpServerDev = (_) => {
        process.exec("npm run wp-server-dev")
    },
    wpServerBuild = (_) => {
        process.exec("npm run wp-server-build")
        _()
    }

gulp.task("deploy", gulp.series(gulp.parallel("postcss", "pug", "imagemin"), wpBuild, "deploy:docs"))

gulp.task("dev", gulp.series(gulp.parallel("postcss", "pug", "move:fonts", "move:img"), gulp.parallel(local, wpDev, "browser-sync")))
gulp.task("build", gulp.series(gulp.parallel("postcss", "pug", "imagemin", "move:fonts", wpBuild)))
gulp.task("server-dev", gulp.series(gulp.parallel("postcss", "imagemin"), gulp.parallel(local, wpServerDev, watch)))
gulp.task("server-build", gulp.series(gulp.parallel("postcss"), gulp.parallel(wpServerBuild, "deploy:css", "deploy:js")))

gulp.task("clearcache", (callback) => {
    $.cache.clearAll()
    callback()
})
