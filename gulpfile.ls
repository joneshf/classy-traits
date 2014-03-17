require! gulp
require! \gulp-livescript

gulp.task \compile ->
  gulp.src \src/**/*.ls
  .pipe gulp-livescript!
  .pipe gulp.dest \lib

gulp.task \index ->
  gulp.src \index.ls
  .pipe gulp-livescript {+bare}
  .pipe gulp.dest \.

gulp.task \default <[ compile index ]>
