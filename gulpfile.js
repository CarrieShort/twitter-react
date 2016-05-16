const gulp = require('gulp');
const webpack = require('webpack-stream');
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

gulp.task('default', ['static:dev']);
