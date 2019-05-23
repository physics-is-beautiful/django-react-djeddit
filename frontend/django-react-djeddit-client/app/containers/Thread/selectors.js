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

export { selectThread, makeSelectThread, makeSelectPosts }
