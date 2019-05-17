import { API_PREFIX } from 'utils/constants'

import request from 'utils/request'

function getTopics() {
  return request(`${API_PREFIX}topics/`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
  })
}

export const Api = { getTopics }
