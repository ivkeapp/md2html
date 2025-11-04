import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
  input: 'public/src/index.js',
  output: {
    file: 'dist/md2html.min.js',
    format: 'umd',
    name: 'md2html',
    sourcemap: true
  },
  plugins: [
    resolve({
      browser: true
    }),
    terser()
  ]
};
