/**
 * Homepage selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectNewTopic = state => state.newTopic || initialState

const makeSelectUser = () =>
  createSelector(
    selectNewTopic,
    newTopicState => newTopicState.user,
  )

// const makeSelectFormData = () =>
//   createSelector(
//     selectNewTopic,
//     newTopicState => {
//       console.log(newTopicState);
//       return newTopicState.formData
//     },
//   )

export { selectNewTopic, makeSelectUser }
