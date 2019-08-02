import { API_PREFIX } from '../../utils/constants'

import request from '../../utils/request'

function getSignedInUser() {
  const conf = window.DJEDDIT_CONFIG

  let API_PROFILE_URL = `${API_PREFIX}users/me/`

  if (conf) {
    ;({ API_PROFILE_URL } = conf)
  }

  const response = request(API_PROFILE_URL, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
  })
  return response
}

export const Api = { getSignedInUser }
