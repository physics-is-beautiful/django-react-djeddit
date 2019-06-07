/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects'
import { LOAD_SIGNED_IN_USER } from './constants'
import { signedInUserLoaded, signedInLoadingError } from './actions'

// import request from '../../utils/request'
// import { makeSelectUsername } from 'containers/HomePage/selectors'

import { Api } from './api'

export function* getSignedInUser() {
  // Select username from store
  // const username = yield select(makeSelectUsername())

  try {
    const user = yield call(Api.getSignedInUser)
    yield put(signedInUserLoaded(user))
  } catch (err) {
    yield put(signedInLoadingError(err))
    yield put(signedInUserLoaded(undefined))
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* appData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_SIGNED_IN_USER, getSignedInUser)
}
