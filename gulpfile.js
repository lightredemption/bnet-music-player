'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const babel = require('gulp-babel');

const paths = {
  scripts: [
    `app.js`
  ],
  styles: [
    `style.scss`
  ],
  jquery: [
    `bower_components/jquery/dist/jquery.min.js`
  ],
  angular: [
    `bower_components/angular/angular.min.js`
  ],
  bower_js: [
    `bower_components/angular-audio/app/angular.audio.js`,
    `bower_components/angular-background/dist/angular-background.min.js`
  ],
  bower_css: [
  ]
};

gulp.task(`scss`, () => {
  return gulp.src(paths.styles)
  .pipe(concat(`style.css`))
  .pipe(sass.sync().on(`error`, sass.logError))
  .pipe(gulp.dest(`public/css/`));
});

gulp.task(`bower_css`, () => {
  return gulp.src(paths.bower_css)
  .pipe(concat(`bower.css`))
  .pipe(sass.sync().on(`error`, sass.logError))
  .pipe(gulp.dest(`public/css/`));
});

gulp.task(`jquery`, () => {
  return gulp.src(paths.jquery)
  .pipe(concat(`jquery.min.js`))
  .pipe(babel({
    presets: [`es2015`]
  }))
  .pipe(gulp.dest(`public/js`));
});

gulp.task(`angular`, () => {
  return gulp.src(paths.angular)
  .pipe(concat(`angular.min.js`))
  .pipe(babel({
    presets: [`es2015`]
  }))
  .pipe(gulp.dest(`public/js`));
});

gulp.task(`bower_js`, () => {
  return gulp.src(paths.bower_js)
  .pipe(concat(`bower.js`))
  .pipe(babel({
    presets: [`es2015`]
  }))
  .pipe(gulp.dest(`public/js`));
});

gulp.task(`js`, () => {
  return gulp.src(paths.scripts)
  .pipe(concat(`app.js`))
  .pipe(babel({
    presets: [`es2015`]
  }))
  .pipe(gulp.dest(`public/js`));
});

gulp.task(`watch`, () => {
  gulp.watch(paths.scripts, [`js`]);
  gulp.watch(paths.styles, [`scss`]);
})

gulp.task('default', [`scss`, `js`, `jquery`, `angular`, `bower_js`, `bower_css`]);
