/*
 * ThreadListReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer'
import {
  LOAD_THREADS,
  LOAD_THREADS_SUCCESS,
  LOAD_THREADS_ERROR,
} from './constants'

// The initial state of the App
export const initialState = {
  threadsList: false,
}

/* eslint-disable default-case, no-param-reassign */
const threadsListReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_THREADS:
        draft.loading = true
        draft.error = false
        draft.threadsList = false
        break

      case LOAD_THREADS_SUCCESS:
        draft.threadsList = action.threadsList
        draft.loading = false
        break

      case LOAD_THREADS_ERROR:
        draft.error = action.error
        draft.loading = false
        break
    }
  })

export default threadsListReducer
