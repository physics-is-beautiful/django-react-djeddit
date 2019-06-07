/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects'
// import { LOAD_REPOS } from 'containers/App/constants'
// import { reposLoaded, repoLoadingError } from 'containers/App/actions'

import { Api } from './api'

import { SIGN_UP } from './constants'
import { signUpSuccess } from './actions'

// /**
//  * Github repos request/response handler
//  */
// export function* getRepos() {
//   // Select username from store
//   const username = yield select(makeSelectUser())
//   const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`
//
//   try {
//     // Call our request helper (see '../../utils/request')
//     const repos = yield call(request, requestURL)
//     yield put(reposLoaded(repos, username))
//   } catch (err) {
//     yield put(repoLoadingError(err))
//   }
// }
//
// /**
//  * Root saga manages watcher lifecycle
//  */
// export default function* githubData() {
//   // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
//   // By using `takeLatest` only the result of the latest API call is applied.
//   // It returns task descriptor (just like fork) so we can continue execution
//   // It will be cancelled automatically on component unmount
//   yield takeLatest(LOAD_REPOS, getRepos)
// }

/**
 * Github repos request/response handler
 */
export function* signUp(action) {
  // Select username from store
  // const formData = yield select(makeSelectFormData())
  // const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`

  try {
    // const success = yield Api.signUpCall(action.formData)
    yield call(Api.signUpCall, action.formData)
    yield call(() => {
      window.location.href = '/'
    })
    // yield put(signUpSuccess(userData))
  } catch (err) {
    // yield put(repoLoadingError(err))
    yield call(() => {
      console.log(err)
    })
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* signUpData() {
  // Watches for SIGN_UP actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(SIGN_UP, signUp)
}
