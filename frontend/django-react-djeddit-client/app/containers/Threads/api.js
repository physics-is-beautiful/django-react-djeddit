import { API_PREFIX } from '../../utils/constants'

import request from '../../utils/request'

function getThreads(topicSlug, nextHref) {
  let url
  if (nextHref) {
    url = nextHref
  } else {
    url = `${API_PREFIX}threads/?topic__slug=${topicSlug}`
  }

  return request(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
  })
}

export const Api = { getThreads }
