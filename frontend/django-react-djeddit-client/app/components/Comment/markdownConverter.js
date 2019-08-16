import Showdown from 'showdown'
// preload mathjax extension
import showdownKatex from 'showdown-katex'
// import * as mathjaxExt from '../../utils/mdeExtensions/mathjax'
import 'katex/dist/katex.css'

export default new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
  // extensions: ['showdown_mathjax_ext'],
  extensions: [
    showdownKatex({
      // maybe you want katex to throwOnError
      throwOnError: true,
      // disable displayMode
      displayMode: false,
    }),
  ],
})
