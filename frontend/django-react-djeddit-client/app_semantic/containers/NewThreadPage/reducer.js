/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer'
import { NEW_THREAD, NEW_THREAD_SUCCESS } from './constants'

// The initial state of the App
export const initialState = {
  user: {},
}

/* eslint-disable default-case, no-param-reassign */
const newThreadReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case NEW_THREAD:
        draft.loading = true
        break
      case NEW_THREAD_SUCCESS:
        draft.loading = false
        draft.thread = action.thread
        break
    }
  })

export default newThreadReducer
