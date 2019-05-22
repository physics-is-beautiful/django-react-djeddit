/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl'

export const scope = 'boilerplate.containers.HomePage'

export default defineMessages({
  newTHREADHeader: {
    id: `${scope}.newTHREAD.header`,
    defaultMessage: 'Create new THREAD',
  },
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Title',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Description',
  },
  submitButton: {
    id: `${scope}.submitButton`,
    defaultMessage: 'Submit',
  },
})
