import gulp from 'gulp';
import file from 'gulp-file';
import { rollup } from 'rollup';

import rollupConfig from './rollup.config.js';

gulp.task('build', function() {
  return rollup(rollupConfig).then(bundle => {
    return bundle.generate(rollupConfig.output).then(gen => {
      return file('p37.js', gen.code, {src: true}).pipe(gulp.dest('dist/'));
    });
  }).catch(err => {
    console.log('TODO: exception cleanup', err);
  });
});
