/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl'

export const scope = 'boilerplate.containers.HomePage'

export default defineMessages({
  threadList: {
    id: `${scope}.thread`,
    defaultMessage: 'Thread',
  },
  submitButton: {
    id: `${scope}.submitButton`,
    defaultMessage: 'Submit',
  },
})
