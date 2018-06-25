import gulp from 'gulp';
import file from 'gulp-file';
import { rollup } from 'rollup';
import babel from 'rollup-plugin-babel';
import includePaths from 'rollup-plugin-includepaths';

let includePathOptions = {
  include: {},
  paths: ['src/viewability', 'build-system/tasks'],
  external: [],
  extensions: ['.js', '.json', '.html']
};

gulp.task('build', function() {
  return rollup({
    input: 'src/main.js',
    plugins: [
      babel({
        presets: [
          [
            "es2015", {
              "modules": false
            }
          ]
        ],
        babelrc: false,
        exclude: 'node_modules/**',
        plugins: ['external-helpers']
      }),
      includePaths(includePathOptions)
    ]
  }).then(bundle => {
    return bundle.generate({
      format: 'umd',
      moduleName: 'p37'
    }).then(gen => {
      return file('p37.js', gen.code, {src: true}).pipe(gulp.dest('dist/'));
    });
  }).catch(err => {
    console.log('TODO: exception cleanup', err);
  });
});
