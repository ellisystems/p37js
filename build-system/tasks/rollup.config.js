import babel from 'rollup-plugin-babel';
import includePaths from 'rollup-plugin-includepaths';

let includePathOptions = {
  include: {},
  paths: ['src/viewability', 'build-system/tasks', 'test'],
  external: [],
  extensions: ['.js', '.json', '.html']
};

export default {
  external: [],
  output: {
    globals: {},
    exports: 'named',
    output: { name: 'p37.js'},
    format: 'iife',
    moduleName: 'p37'
  },
  input: 'src/p37.js',
  plugins: [
    babel({
      presets: [
        [
          'env', {
            'modules': false
          }
        ]
      ],
      babelrc: false,
      exclude: 'node_modules/**',
      plugins: ['external-helpers']
    }),
    includePaths(includePathOptions)
  ]
};
