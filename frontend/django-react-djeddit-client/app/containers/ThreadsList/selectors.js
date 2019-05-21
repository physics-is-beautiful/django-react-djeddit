/**
 * threads list selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectThreadsList = state => state.threadsList || initialState

const makeSelectThreadsList = () =>
  createSelector(
    selectThreadsList,
    threadListState => threadListState.threadsList,
  )

export { selectThreadsList, makeSelectThreadsList }
