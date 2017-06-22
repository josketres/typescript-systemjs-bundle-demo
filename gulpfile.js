const gulp = require('gulp');
const ts = require('gulp-typescript');
const typescript = require('typescript');
const systemjsBuilder = require('gulp-systemjs-builder');
const webserver = require('gulp-webserver');

gulp.task('tsc', () => {
    const tsProject = ts.createProject('tsconfig.json');
    return gulp
        .src('src/**/*.ts')
        .pipe(tsProject()).js
        .pipe(gulp.dest('./src'));
});

gulp.task('bundle', ['tsc'], () => {
    let builder = systemjsBuilder('src/', 'system.conf.js');
    return builder.build('main.js', 'bundle.js', {
        minify: true,
        mangle: true,
        sourceMaps: true,
        lowResSourceMaps: true
    })
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
