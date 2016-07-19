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
  ]
};

gulp.task(`scss`, () => {
  return gulp.src(paths.styles)
  .pipe(concat(`style.css`))
  .pipe(sass.sync().on(`error`, sass.logError))
  .pipe(gulp.dest(`public/css/`));
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

gulp.task('default', [`scss`, `js`]);
