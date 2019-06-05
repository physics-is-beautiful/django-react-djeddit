/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer'
import { SIGN_IN, SIGN_IN_SUCCESS } from './constants'

// The initial state of the App
export const initialState = {
  user: {},
}

/* eslint-disable default-case, no-param-reassign */
const signInReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SIGN_IN:
        draft.loading = true
        break
      case SIGN_IN_SUCCESS:
        draft.loading = false
        draft.user = action.user
        break
    }
  })

export default signInReducer
