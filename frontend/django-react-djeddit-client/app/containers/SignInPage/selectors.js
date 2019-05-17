/**
 * Homepage selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectSignIn = state => state.signIn || initialState

const makeSelectUser = () =>
  createSelector(
    selectSignIn,
    signInState => signInState.user,
  )

// const makeSelectFormData = () =>
//   createSelector(
//     selectSignIn,
//     signInState => {
//       console.log(signInState);
//       return signInState.formData
//     },
//   )

export { selectSignIn, makeSelectUser }
