const gulp = require('gulp');
const ts = require('gulp-typescript');
const typescript = require('typescript');
const builder = require('gulp-systemjs-builder');
const webserver = require('gulp-webserver');

gulp.task('ts', () => {
    const tsProject = ts.createProject('tsconfig.json');
    return gulp
        .src('src/**/*.ts')
        .pipe(tsProject()).js
        .pipe(gulp.dest('./src'));
});

gulp.task('bundle', ['ts'], () => {
    return builder('src', 'system.conf.js')
        .bundle('main.js', 'main.min.js')
        .pipe(gulp.dest('./src'));
});

gulp.task('webserver', ['bundle'], () => {
    return gulp.src('./')
        .pipe(webserver({
            host: '0.0.0.0',
            port: 8180,
            open: 'index.html'
        }));
});
