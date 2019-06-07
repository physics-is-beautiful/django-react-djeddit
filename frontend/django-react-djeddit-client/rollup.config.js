import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'
import json from 'rollup-plugin-json'
import svgr from '@svgr/rollup'

import pkg from './package.json'

export default {
  input: 'app/ThreadComponent.js',
  output: [
    {
      file: pkg.main,
      format: 'amd',
      name: 'ThreadComponent',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      name: 'ThreadComponent',
      sourcemap: true,
    },
  ],
  plugins: [
    external(),
    postcss({
      modules: true,
    }),
    url({ exclude: ['**/*.svg'] }),
    svgr(),
    babel({
      exclude: 'node_modules/**',
      plugins: ['@babel/external-helpers'],
    }),
    resolve(),
    json(),
    commonjs({
      // namedExports: {
      // 'react-dom': ['unstable_batchedUpdates'],
      // },
      // include: [
      //   'node_modules/react/**',
      //   'node_modules/react-dom/**',
      //   'node_modules/prop-types/**',
      //   'node_modules/create-react-class/**', // adding the module with that "default not exported by" message to this includes list, made that message go away
      // ],
    }),
  ],
  external: [
    'react',
    'react-dom',
    'react-bootstrap',
    'react-is',
    'prop-types',
    'lodash',
    'styled-components',
  ],
}
