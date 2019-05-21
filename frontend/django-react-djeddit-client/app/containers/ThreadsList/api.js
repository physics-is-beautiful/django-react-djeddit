import { API_PREFIX } from 'utils/constants'

import request from 'utils/request'

function getThreads(nextHref) {
  let url
  if (nextHref) {
    url = nextHref
  } else {
    url = `${API_PREFIX}threads/`
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
