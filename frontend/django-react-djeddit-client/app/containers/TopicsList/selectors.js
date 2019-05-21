/**
 * topics list selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectTopicsList = state => state.topicsList || initialState

const makeSelectTopicsList = () =>
  createSelector(
    selectTopicsList,
    topicListState => topicListState.topicsList,
  )

export { selectTopicsList, makeSelectTopicsList }
