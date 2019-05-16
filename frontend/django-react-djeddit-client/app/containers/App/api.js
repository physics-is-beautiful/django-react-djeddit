import { API_PREFIX } from 'utils/constants'

import request from 'utils/request'

function getSignedInUser() {
  const respone = request(`${API_PREFIX}users/me/`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
  })
  return respone
}

export const Api = { getSignedInUser }
