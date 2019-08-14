import { call, put, select, all, takeLatest } from 'redux-saga/effects'
// import { makeSelectUsername } from 'containers/HomePage/selectors'
import {
  threadLoaded,
  threadLoadingError,
  postsLoaded,
  postsLoadingError,
  newPostSuccess,
  newPostError,
  updatePostSuccess,
  updatePostError,
  deletePostSuccess,
} from './actions'

import { Api } from './api'
import {
  LOAD_POSTS,
  LOAD_THREAD,
  NEW_POST,
  UPDATE_POST,
  VOTE_POST,
  DELETE_POST,
} from './constants'

export function* getThread(sagaArgs) {
  const { nextHref, topicSlug } = sagaArgs

  // const username = yield select(makeSelectUsername())

  try {
    // Call our request helper (see '../../utils/request')
    // const repos = yield call(request, requestURL)

    const threadList = yield call(Api.getThread, topicSlug, nextHref)

    yield put(threadLoaded(threadList))
  } catch (err) {
    yield put(threadLoadingError(err))
  }
}

export function* getPostsList(sagaArgs) {
  const { threadId, nextHref } = sagaArgs

  try {
    const postsList = yield call(Api.getPosts, threadId, nextHref)
    yield put(postsLoaded(postsList))
  } catch (err) {
    yield put(postsLoadingError(err))
  }
}

export function* newPost(sagaArgs) {
  const { post } = sagaArgs

  try {
    const newPost1 = yield call(Api.newPostCall, post)
    yield put(newPostSuccess(newPost1))
  } catch (err) {
    yield put(newPostError(err))
  }
}

export function* updatePost(sagaArgs) {
  const { post } = sagaArgs

  try {
    const updatePost1 = yield call(Api.updatePostCall, post)
    yield put(updatePostSuccess(updatePost1))
  } catch (err) {
    yield put(updatePostError(err))
  }
}

export function* votePost(sagaArgs) {
  const { post, vote } = sagaArgs

  try {
    const updatePost1 = yield call(Api.votePostCall, post, vote)
    yield put(updatePostSuccess(updatePost1))
  } catch (err) {
    yield put(updatePostError(err))
  }
}

export function* deletePost(sagaArgs) {
  const { post } = sagaArgs

  try {
    const deletedPost = yield call(Api.deletePostCall, post)
    yield put(deletePostSuccess(deletedPost))
  } catch (err) {}
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* threadData() {
  // Watches for LOAD_REPOS actions and calls getThreadList when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield all([
    takeLatest(LOAD_THREAD, getThread),
    takeLatest(LOAD_POSTS, getPostsList),
    takeLatest(NEW_POST, newPost),
    takeLatest(UPDATE_POST, updatePost),
    takeLatest(DELETE_POST, deletePost),
    takeLatest(VOTE_POST, votePost),
  ])
}
