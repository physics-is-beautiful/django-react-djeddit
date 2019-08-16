// /**
//  * MathJax Extension.
//  */
// ;(function(extension) {
//   if (typeof showdown !== 'undefined') {
//     // global (browser or nodejs global)
//     extension(showdown)
//   } else if (typeof define === 'function' && define.amd) {
//     // AMD
//     define(['showdown'], extension)
//   } else if (typeof exports === 'object') {
//     // Node, CommonJS-like
//     module.exports = extension(require('showdown'))
//   } else {
//     // showdown was not found so we throw
//     throw Error('Could not find showdown library')
//   }
// })(function(showdown) {
//   const showdown_mathjax_ext = function() {
//     return [
//       {
//         type: 'output',
//         filter(text, converter, options) {
//           return text
//         },
//       },
//     ]
//   }
//
//   showdown.extension('showdown_mathjax_ext', showdown_mathjax_ext)
// })
