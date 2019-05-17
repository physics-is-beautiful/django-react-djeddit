/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects'
// import { LOAD_REPOS } from 'containers/App/constants'
// import { reposLoaded, repoLoadingError } from 'containers/App/actions'

import { Api } from './api'

import { SIGN_IN } from './constants'

/**
 * Github repos request/response handler
 */
export function* signIn(action) {
  // Select username from store
  // const formData = yield select(makeSelectFormData())
  // const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`

  try {
    // const success = yield Api.signInCall(action.formData)
    yield call(Api.signInCall, action.formData)
    yield call(() => {
      window.location.href = '/'
    })
    // yield put(signInSuccess(userData))
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
export default function* signInData() {
  // Watches for SIGN_IN actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(SIGN_IN, signIn)
}
