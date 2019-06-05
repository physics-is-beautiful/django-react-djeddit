/**
 * Homepage selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectSignUp = state => state.signUp || initialState

const makeSelectUser = () =>
  createSelector(
    selectSignUp,
    signUpState => signUpState.user,
  )

// const makeSelectFormData = () =>
//   createSelector(
//     selectSignUp,
//     signUpState => {
//       console.log(signUpState);
//       return signUpState.formData
//     },
//   )

export { selectSignUp, makeSelectUser }
