/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl'

export const scope = 'django-react-djeddit-client.components.Header'

export default defineMessages({
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  topics: {
    id: `${scope}.topics`,
    defaultMessage: 'Topics',
  },
  newTopic: {
    id: `${scope}.new-topics`,
    defaultMessage: 'New topic',
  },
  newThread: {
    id: `${scope}.new thread`,
    defaultMessage: 'New thread',
  },
  // features: {
  //   id: `${scope}.features`,
  //   defaultMessage: 'Features',
  // },
})
