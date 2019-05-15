/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer'
import { CHANGE_USERNAME, SIGN_UP, SIGN_UP_SUCCESS } from './constants'

// The initial state of the App
export const initialState = {
  user: {},
}

/* eslint-disable default-case, no-param-reassign */
const signUpReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_USERNAME:
        // Delete prefixed '@' from the github username
        draft.username = action.username.replace(/@/gi, '')
        break
      case SIGN_UP:
        draft.loading = true
        break
      case SIGN_UP_SUCCESS:
        draft.loading = false
        draft.user = action.user
        break
    }
  })

export default signUpReducer
