/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer'
import { NEW_TOPIC, NEW_TOPIC_SUCCESS } from './constants'

// The initial state of the App
export const initialState = {
  user: {},
}

/* eslint-disable default-case, no-param-reassign */
const newTopicReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case NEW_TOPIC:
        draft.loading = true
        break
      case NEW_TOPIC_SUCCESS:
        draft.loading = false
        draft.user = action.user
        break
    }
  })

export default newTopicReducer
