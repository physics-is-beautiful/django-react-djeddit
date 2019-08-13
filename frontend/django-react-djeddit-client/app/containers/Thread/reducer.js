/*
 * ThreadListReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer'
import {
  LOAD_THREAD,
  LOAD_THREAD_SUCCESS,
  LOAD_THREAD_ERROR,
  LOAD_POSTS,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_ERROR,
  NEW_POST,
  NEW_POST_SUCCESS,
  NEW_POST_ERROR,
  UPDATE_POST_SUCCESS,
  DELETE_POST_SUCCESS,
} from './constants'

// The initial state of the App
export const initialState = {
  thread: false,
  postsList: false,
  newPost: false,
  updatedPost: null,
}

// TODO refactor this

/* eslint-disable default-case, no-param-reassign */
const threadReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_THREAD:
        draft.loading = true
        draft.error = false
        draft.thread = false
        break

      case LOAD_THREAD_SUCCESS:
        draft.thread = action.thread
        draft.loading = false
        break

      case LOAD_THREAD_ERROR:
        draft.error = action.error
        draft.loading = false
        break

      case LOAD_POSTS:
        draft.loading = true
        draft.error = false
        draft.postsList = false
        break

      case LOAD_POSTS_SUCCESS:
        draft.postsList = action.postsList
        draft.loading = false
        break

      case LOAD_POSTS_ERROR:
        draft.error = action.error
        draft.loading = false
        break

      case NEW_POST:
        draft.loading = true
        draft.error = false
        draft.newPost = false
        break

      case NEW_POST_SUCCESS:
        draft.newPost = action.newPost
        draft.loading = false
        break

      case NEW_POST_ERROR:
        draft.error = action.error
        draft.loading = false
        break

      case UPDATE_POST_SUCCESS:
        draft.updatedPost = action.updatedPost
        draft.loading = false
        break

      case DELETE_POST_SUCCESS:
        draft.deletedPost = action.deletedPost
        break
    }
  })

export default threadReducer
