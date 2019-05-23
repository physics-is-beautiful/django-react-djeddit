import { API_PREFIX } from 'utils/constants'

import request from 'utils/request'

function getThread(threadSlug) {
  const url = `${API_PREFIX}threads/${threadSlug}/`

  return request(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
  })
}

function getPosts(threadId, nextHref) {
  let url
  if (nextHref) {
    url = nextHref
  } else {
    url = `${API_PREFIX}posts/?thread=${threadId}`
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

export const Api = { getThread, getPosts }
