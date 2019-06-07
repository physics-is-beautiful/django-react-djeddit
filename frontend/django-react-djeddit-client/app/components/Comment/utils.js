import React from 'react'

import MathJax from 'react-mathjax2'

export function renderMathJs(content) {
  return (
    <MathJax.Context
      input="ascii"
      onError={(mathJax, error) => {
        console.warn(error)
        console.log('Encountered a MathJax error, re-attempting a typeset!')
        mathJax.Hub.Queue(mathJax.Hub.Typeset())
      }}
      script="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=AM_HTMLorMML"
      options={{
        extensions: ['tex2jax.js', '[mhchem]/mhchem.js'],
        jax: ['input/TeX', 'output/HTML-CSS'],
        tex2jax: {
          inlineMath: [['$', '$'], ['\\(', '\\)']],
          displayMath: [['$$', '$$'], ['\\[', '\\]']],
          processEscapes: true,
        },
        'HTML-CSS': { fonts: ['TeX'] },
      }}
    >
      <MathJax.Text text={content} />
    </MathJax.Context>
  )
}
