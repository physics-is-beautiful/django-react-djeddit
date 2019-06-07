import request from '../../utils/request'

import Cookies from 'js-cookie'

function* signUpCall(data) {
  const csrftoken = Cookies.get('csrftoken')

  // const formData = new FormData()
  // Object.keys(data).forEach(key => formData.append(key, data[key]))

  const searchParams = Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&')

  yield request('/accounts/signup/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      // 'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken,
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: searchParams,
    // body: JSON.stringify(
    //   Object.assign({}, formData, { csrfmiddlewaretoken: csrftoken }),
    // ),
  })
}

export const Api = { signUpCall }
