/**
 * thread selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectThread = state => state.thread || initialState

const makeSelectThread = () =>
  createSelector(
    selectThread,
    threadState => threadState.thread,
  )

const makeSelectPosts = () =>
  createSelector(
    selectThread,
    threadState => threadState.postsList,
  )

const makeSelectNewPost = () =>
  createSelector(
    selectThread,
    threadState => threadState.newPost,
  )

const makeSelectUpdatedPost = () =>
  createSelector(
    selectThread,
    threadState => threadState.updatedPost,
  )

const makeSelectDeletedPost = () =>
  createSelector(
    selectThread,
    threadState => threadState.deletedPost,
  )

export {
  selectThread,
  makeSelectThread,
  makeSelectPosts,
  makeSelectNewPost,
  makeSelectUpdatedPost,
  makeSelectDeletedPost,
}
