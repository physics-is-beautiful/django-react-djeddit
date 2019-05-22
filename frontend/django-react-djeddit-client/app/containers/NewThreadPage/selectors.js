/**
 * Homepage selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectNewTHREAD = state => state.newTHREAD || initialState

const makeSelectUser = () =>
  createSelector(
    selectNewTHREAD,
    newTHREADState => newTHREADState.user,
  )

// const makeSelectFormData = () =>
//   createSelector(
//     selectNewTHREAD,
//     newTHREADState => {
//       console.log(newTHREADState);
//       return newTHREADState.formData
//     },
//   )

export { selectNewTHREAD, makeSelectUser }
