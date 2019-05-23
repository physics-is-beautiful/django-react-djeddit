/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects'
// import { LOAD_REPOS } from 'containers/App/constants'
// import { reposLoaded, repoLoadingError } from 'containers/App/actions'

import { Api } from './api'

import { NEW_THREAD } from './constants'
import history from '../../utils/history'

export function* newThread(action) {
  // Select username from store
  // const formData = yield select(makeSelectFormData())
  // const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`

  try {
    // const success = yield Api.newThreadCall(action.formData)
    const thread = yield call(Api.newThreadCall, action.formData)
    yield call(() => {
      // move to threads list
      history.push(`/${action.formData.topic_slug}/${thread.id}/${thread.slug}`)
    })
    // yield put(newThreadSuccess(userData))
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
export default function* newThreadData() {
  // Watches for NEW_Thread actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(NEW_THREAD, newThread)
}
