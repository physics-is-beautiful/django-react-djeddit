/**
 * threads list selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectThreads = state => state.threads || initialState

const makeSelectThreadsList = () =>
  createSelector(
    selectThreads,
    threadListState => threadListState.threadsList,
  )

export { selectThreads, makeSelectThreadsList }
