import request from '../../utils/request'

import { API_PREFIX } from '../../utils/constants'

import Cookies from 'js-cookie'

function newThreadCall(data) {
  const csrftoken = Cookies.get('csrftoken')

  // const formData = new FormData()
  // Object.keys(data).forEach(key => formData.append(key, data[key]))

  // const searchParams = Object.keys(data)
  //   .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
  //   .join('&')

  return request(`${API_PREFIX}threads/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken,
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify(data),
    // body: JSON.stringify(
    //   Object.assign({}, formData, { csrfmiddlewaretoken: csrftoken }),
    // ),
  })
}

export const Api = { newThreadCall }
