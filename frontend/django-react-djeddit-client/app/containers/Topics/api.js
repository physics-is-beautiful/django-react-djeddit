import { API_PREFIX } from '../../utils/constants'

import request from '../../utils/request'

function getTopics(nextHref) {
  let url
  if (nextHref) {
    url = nextHref
  } else {
    url = `${API_PREFIX}topics/`
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

function getTopic(slug) {
  const url = `${API_PREFIX}topics/${slug}/`

  return request(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
  })
}

export const Api = { getTopics, getTopic }
