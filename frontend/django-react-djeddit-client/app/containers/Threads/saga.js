import { call, put, select, takeLatest } from 'redux-saga/effects'
// import { makeSelectUsername } from 'containers/HomePage/selectors'
import { LOAD_THREADS } from './constants'
import { threadsListLoaded, threadsListLoadingError } from './actions'

import { Api } from './api'

export function* getThreadsList(sagaArgs) {
  const { nextHref, topicSlug } = sagaArgs

  // const username = yield select(makeSelectUsername())

  try {
    // Call our request helper (see '../../utils/request')
    // const repos = yield call(request, requestURL)

    const threadsList = yield call(Api.getThreads, topicSlug, nextHref)

    yield put(threadsListLoaded(threadsList))
  } catch (err) {
    yield put(threadsListLoadingError(err))
  }
}

// export function* clearThreadsList() {}

/**
 * Root saga manages watcher lifecycle
 */
export default function* threadsData() {
  // Watches for LOAD_REPOS actions and calls getThreadsList when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_THREADS, getThreadsList)
}
