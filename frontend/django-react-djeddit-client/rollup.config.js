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
    resolve(),
    json(),
    babel({
      // exclude: 'node_modules/**',
      // exclude: 'node_modules/@babel/runtime/**',
      babelrc: false,
      presets: [
        '@babel/react',
        [
          '@babel/env',
          {
            modules: false,
            // useBuiltIns: 'usage',
            // corejs: '2',
            targets: {
              chrome: '61',
            },
          },
        ],
      ],
      plugins: [
        // '@babel/external-helpers',
        [
          '@babel/transform-runtime',
          {
            // corejs: 2,
            corejs: false,
            helpers: true,
            regenerator: false,
            useESModules: true,
          },
        ],
        '@babel/proposal-object-rest-spread',
      ],
      runtimeHelpers: true,
    }),
    commonjs({
      namedExports: {
        // 'node_modules/@babel/runtime/helpers/typeof.js': ['default'],
        // 'node_modules/@babel/runtime-corejs2/core-js/object/assign.js': [
        //   'default',
        // ],
      },
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
    'showdown-katex',
    'react-mde',
    'react-bootstrap/Button',
    'react-bootstrap/Container',
    'react-bootstrap/Row',
    'react-bootstrap/Col',
    'react-bootstrap/ListGroup',
    'react-bootstrap/Form',
    'react-bootstrap/Breadcrumb',
    'intl-messageformat',
    'intl-relativeformat',
    '@react-bootstrap',
    // '@babel/polyfill',
    // '@babel/runtime-corejs2/core-js/object/',
    // '@babel/runtime',
  ],
}
