/**
 * This is the entry file for the thread component,
 */

// Needed for redux-saga es6 generator support
// import '@babel/polyfill'

// Import all the third party stuff
import React from 'react'
// import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
// import { ConnectedRouter } from 'connected-react-router'
// import FontFaceObserver from 'fontfaceobserver'
// import history from 'utils/history'
import 'sanitize.css/sanitize.css'

import ThreadPage from './containers/Thread'

// Import Language Provider
// import LanguageProvider from 'containers/LanguageProvider'

import configureStore from './configureStore'

/* <LanguageProvider messages={messages}> */
/* </LanguageProvider> */

// export default ThreadComponent = <Provider store={store}>
//       <LanguageProvider messages={messages}>
//         <ThreadPage embedMode />
//       </LanguageProvider>
//     </Provider>,

// Chunked polyfill for browsers without Intl support
// if (!window.Intl) {
//   new Promise(resolve => {
//     resolve(import('intl'))
//   })
//     .then(() =>
//       Promise.all([
//         import('intl/locale-data/jsonp/en.js'),
//         import('intl/locale-data/jsonp/de.js'),
//       ]),
//     ) // eslint-disable-line prettier/prettier
//     .then(() => render(translationMessages))
//     .catch(err => {
//       throw err
//     })
// } else {
//   render(translationMessages)
// }

// const ThreadComponent = () => render(translationMessages)

// Import i18n messages
// import { translationMessages } from './i18n'

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
// const openSansObserver = new FontFaceObserver('Open Sans', {})
//
// // When Open Sans is loaded, add a font-family using Open Sans to the body
// openSansObserver.load().then(() => {
//   document.body.classList.add('fontLoaded')
// })

// Create redux store with history
const initialState = {}
const store = configureStore(initialState)

/** *
 * @param threadId
 * @param anonUserObject use anonUserObject if true with is_anonymous attr {"is_anonymous":true}
 * @returns {*}
 * @constructor
 */
export function ThreadComponent({ threadId }) {
  return (
    <Provider store={store}>
      <ThreadPage threadId={threadId} />
    </Provider>
  )
}

ThreadComponent.propTypes = {
  threadId: PropTypes.number,
  anonAsUserObject: PropTypes.bool,
}
