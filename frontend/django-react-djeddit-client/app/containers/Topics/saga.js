import { call, put, select, takeLatest, all } from 'redux-saga/effects'
// import { makeSelectUsername } from 'containers/HomePage/selectors'
import { LOAD_TOPICS, LOAD_TOPIC } from './constants'
import {
  topicsListLoaded,
  topicsListLoadingError,
  topicLoaded,
  topicLoadingError,
} from './actions'

import { Api } from './api'

export function* getTopicsList(sagaArgs) {
  const { nextHref } = sagaArgs

  try {
    const topicsList = yield call(Api.getTopics, nextHref)
    yield put(topicsListLoaded(topicsList))
  } catch (err) {
    yield put(topicsListLoadingError(err))
  }
}

export function* getTopic(sagaArgs) {
  const { slug } = sagaArgs

  try {
    const topic = yield call(Api.getTopic, slug)
    yield put(topicLoaded(topic))
  } catch (err) {
    yield put(topicLoadingError(err))
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
  // yield takeLatest(LOAD_TOPICS, getTopicsList)
  // yield takeLatest(LOAD_TOPIC, getTopic)
  yield all([
    takeLatest(LOAD_TOPICS, getTopicsList),
    takeLatest(LOAD_TOPIC, getTopic),
  ])
}
