/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl'

export const scope = 'boilerplate.containers.HomePage'

export default defineMessages({
  newTopicHeader: {
    id: `${scope}.newtopic.header`,
    defaultMessage: 'Create new Topic',
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
