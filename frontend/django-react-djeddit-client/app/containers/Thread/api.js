import { API_PREFIX } from '../../utils/constants'

import request from '../../utils/request'
import Cookies from 'js-cookie'

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
    url = `${API_PREFIX}posts/?thread_id=${threadId}`
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

function newPostCall(post) {
  const csrftoken = Cookies.get('csrftoken')

  return request(`${API_PREFIX}posts/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken,
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify(post),
  })
}

function updatePostCall(post) {
  const csrftoken = Cookies.get('csrftoken')

  return request(`${API_PREFIX}posts/${post.uid}/`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken,
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify(post),
  })
}

export const Api = { getThread, getPosts, newPostCall, updatePostCall }
