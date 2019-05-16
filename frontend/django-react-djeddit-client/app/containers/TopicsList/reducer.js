/*
 * HomeReducer
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
} from './constants'

// The initial state of the App
export const initialState = {
  topicsList: false,
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
    }
  })

export default topicsListReducer
