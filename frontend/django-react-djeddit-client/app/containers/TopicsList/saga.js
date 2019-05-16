/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects'
import { makeSelectUsername } from 'containers/HomePage/selectors'
import { LOAD_TOPICS } from './constants'
import { topicsListLoaded, topicsListLoadingError } from './actions'

import { Api } from './api'

/**
 * Github repos request/response handler
 */
export function* getTopicsList() {
  // Select username from store
  const username = yield select(makeSelectUsername())
  // const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`

  try {
    // Call our request helper (see 'utils/request')
    // const repos = yield call(request, requestURL)

    const topicsList = yield call(Api.signUpCall)

    yield put(topicsListLoaded(topicsList, username))
  } catch (err) {
    yield put(topicsListLoadingError(err))
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* topicsData() {
  // Watches for LOAD_REPOS actions and calls getTopicsList when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_TOPICS, getTopicsList)
}
