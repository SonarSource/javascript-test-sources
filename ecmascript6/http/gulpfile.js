var gulp = require('gulp');
var pipe = require('pipe/gulp');
var connect = require('gulp-connect');
var karma = require('./lib/gulp/karma');


var path = {
  src: './src/**/*.js',
  // we have to skip example/node (because of the cyclic symlink)
  examples: './example/!(node)/**/*.js'
};


// TRANSPILE ES6
gulp.task('build_source_amd', function() {
  gulp.src(path.src)
      .pipe(pipe.traceur())
      .pipe(gulp.dest('dist/amd'));
});

gulp.task('build_source_cjs', function() {
  gulp.src(path.src)
      .pipe(pipe.traceur({modules: 'commonjs'}))
      .pipe(gulp.dest('dist/cjs'));
});

gulp.task('build_examples', function() {
  gulp.src(path.examples)
      .pipe(pipe.traceur())
      .pipe(gulp.dest('compiled/example'));
});

gulp.task('build_dist', ['build_source_cjs', 'build_source_amd']);
gulp.task('build', ['build_dist', 'build_examples']);


// WATCH FILES FOR CHANGES
gulp.task('watch', function() {
  gulp.watch(path.src, ['build']);
});


// WEB SERVER
gulp.task('serve', connect.server({
  root: __dirname,
  port: 8000,
  open: {
    browser: 'Google Chrome'
  }
}));

// TEST
gulp.task('test', function(done) {
  var options = {
    configFile: 'karma.conf.js'
  };
  for (var i=0, ii = process.argv.length; i<ii; ++i) {
    var val = process.argv[i];
    if (val === '--debug') options.debugRun = true;
    if (val === '--watch') options.autoWatch = true;
    else if (val === '--single-run') options.singleRun = true;
    else if (val === '--browsers') options.browsers = process.argv[++i].split(',');
  }
  karma(options, done);
});

