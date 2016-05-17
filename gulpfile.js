const gulp = require('gulp');
const eslint = require('gulp-eslint');
const fork = require('child_process').fork;
const spawn = require('child_process').spawn;
const webpack = require('webpack-stream');

const files = ['*.js', './**/**/app'];

gulp.task('webpack:dev', () => {
  return gulp.src('./app/js/index.jsx')
  .pipe(webpack({
    devtool: 'source-map',
    module: {
      loaders: [
        { test: /\.css$/, loader: 'style!css' },
        { test: /\.jsx$/, loader: 'jsx-loader?insertPragma=React.DOM&harmony' }
      ]
    },
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('./build'));
});

gulp.task('static:dev', ['webpack:dev'], () => {
  return gulp.src('./app/**/*.html')
  .pipe(gulp.dest('./build'));
});

gulp.task('lint:dev', () => {
  return gulp.src(files)
  .pipe(eslint())
  .pipe(eslint.format());
});

var children = [];
gulp.task('start:server', ['satic:dev'], () => {
  children.push(fork('rest_server.js'));
  children.push(fork('app_server.js'));
  children.push(spawn('webdriver-manager', ['start']));
});

gulp.task('build:dev', ['webpack:dev', 'static:dev']);
gulp.task('default', ['build:dev']);

process.on('exit', () => {
  children.forEach((child) => {
    child.kill('SIGINT');
  });
});
