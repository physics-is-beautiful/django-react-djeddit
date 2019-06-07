import Cookies from 'js-cookie'
import request from '../../utils/request'

function signInCall(data) {
  const csrftoken = Cookies.get('csrftoken')

  // const formData = new FormData()
  // Object.keys(data).forEach(key => formData.append(key, data[key]))

  const searchParams = Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&')

  return request('/accounts/login/', {
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

export const Api = { signInCall }
