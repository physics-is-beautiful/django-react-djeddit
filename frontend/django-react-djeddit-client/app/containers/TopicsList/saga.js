import { call, put, select, takeLatest } from 'redux-saga/effects'
// import { makeSelectUsername } from 'containers/HomePage/selectors'
import { LOAD_TOPICS } from './constants'
import { topicsListLoaded, topicsListLoadingError } from './actions'

import { Api } from './api'

export function* getTopicsList(sagaArgs) {
  const { nextHref } = sagaArgs

  // const username = yield select(makeSelectUsername())

  try {
    // Call our request helper (see 'utils/request')
    // const repos = yield call(request, requestURL)

    const topicsList = yield call(Api.getTopics, nextHref)

    yield put(topicsListLoaded(topicsList))
  } catch (err) {
    yield put(topicsListLoadingError(err))
  }
}

// export function* clearTopicsList() {}

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
