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

export {
  selectThread,
  makeSelectThread,
  makeSelectPosts,
  makeSelectNewPost,
  makeSelectUpdatedPost,
}
