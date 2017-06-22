const gulp = require('gulp');
const ts = require('gulp-typescript');
const typescript = require('typescript');
const webserver = require('gulp-webserver');
const sourcemaps = require('gulp-sourcemaps');
const Builder = require('systemjs-builder');
const path = require('path');

gulp.task('tsc', () => {
    const tsProject = ts.createProject('tsconfig.json');
    return gulp.src('src/**/*.ts', {base: 'src'})
        .pipe(sourcemaps.init())
        .pipe(tsProject()).js
        .pipe(sourcemaps.mapSources(function (sourcePath, file) {
            return path.basename(sourcePath);
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./src'));
});

gulp.task('bundle', ['tsc'], () => {
    const builder = new Builder('./src/', 'system.conf.js');
    return builder
        .bundle('main.js', 'src/bundle.js', {
            sourceMaps: true,
            sourceMapContents: true
        })
        .then(function () {
            console.log('Build complete');
        })
        .catch(function (err) {
            console.log('Build error');
            console.log(err);
        });
});

gulp.task('webserver', ['bundle'], () => {
    return gulp.src('./')
        .pipe(webserver({
            host: '0.0.0.0',
            port: 8180,
            open: 'index.html'
        }));
});
