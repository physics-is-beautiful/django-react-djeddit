 // import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectNewThread = state => state.newThread || initialState

export { selectNewThread }
