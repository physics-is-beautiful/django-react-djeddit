/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl'

export const scope = 'boilerplate.containers.HomePage'

export default defineMessages({
  newThreadHeader: {
    id: `${scope}.newThread.header`,
    defaultMessage: 'Create new thread',
  },
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Title',
  },
  content: {
    id: `${scope}.content`,
    defaultMessage: 'Content',
  },
  submitButton: {
    id: `${scope}.submitButton`,
    defaultMessage: 'Submit',
  },
})
