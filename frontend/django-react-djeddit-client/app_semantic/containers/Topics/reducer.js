/*
 * TopicListReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer'
import {
  LOAD_TOPICS,
  LOAD_TOPICS_SUCCESS,
  LOAD_TOPICS_ERROR,
  LOAD_TOPIC,
  LOAD_TOPIC_SUCCESS,
  LOAD_TOPIC_ERROR,
} from './constants'

// The initial state of the App
export const initialState = {
  topicsList: false,
  topic: false,
}

/* eslint-disable default-case, no-param-reassign */
const topicsListReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_TOPICS:
        draft.loading = true
        draft.error = false
        draft.topicsList = false
        break

      case LOAD_TOPICS_SUCCESS:
        draft.topicsList = action.topicsList
        draft.loading = false
        break

      case LOAD_TOPICS_ERROR:
        draft.error = action.error
        draft.loading = false
        break

      case LOAD_TOPIC:
        draft.loading = true
        draft.error = false
        draft.topic = false
        break

      case LOAD_TOPIC_SUCCESS:
        draft.topic = action.topic
        draft.loading = false
        break

      case LOAD_TOPIC_ERROR:
        draft.error = action.error
        draft.loading = false
        break
    }
  })

export default topicsListReducer
