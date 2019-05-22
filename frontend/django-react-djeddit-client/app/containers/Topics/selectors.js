/**
 * topics list selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectTopics = state => state.topics || initialState

const makeSelectTopicsList = () =>
  createSelector(
    selectTopics,
    topicsState => topicsState.topicsList,
  )

const makeSelectTopic = () =>
  createSelector(
    selectTopics,
    topicsState => topicsState.topic,
  )

export { selectTopics, makeSelectTopicsList, makeSelectTopic }
