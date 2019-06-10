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
    external(), // exclude peer deps
    postcss({
      // modules: true,
      extensions: ['.css'],
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
      //   'node_modules/react-bootstrap/Container.js': ['default'],
      // },
      exclude: [
        'node_modules/**',
        // 'node_modules/react/**',
        // 'node_modules/react-dom/**',
        // 'node_modules/react-bootstrap/**',
        // 'node_modules/@react-bootstrap/**',
      ],
      // include: [
      //   'node_modules/prop-types/**',
      //   'node_modules/create-react-class/**', // adding the module with that "default not exported by" message to this includes list, made that message go away
      // ],
    }),
  ],
  external: [
    'react',
    'react-dom',
    'react-is',
    'prop-types',
    'lodash',
    'react-helmet',
    'react-infinite-scroller',
    'hoist-non-react-statics',
    'remark-math',
    'react-mathjax2',
    'react-markdown',
    'redux-saga',
    'react-intl',
    'create-react-context',
    'react-router',
    'redux',
    'react-moment',
    'moment',
    'invariant',
    'js-cookie',
    'reselect',
    'styled-components',
    'showdown',
    'react-mde',
    'react-bootstrap/Container',
    'react-bootstrap/Row',
    'react-bootstrap/Col',
    'react-bootstrap/ListGroup',
    'react-bootstrap/Form',
    'react-bootstrap/Breadcrumb',
    'intl-messageformat',
    'intl-relativeformat',
    '@react-bootstrap',
  ],
}
