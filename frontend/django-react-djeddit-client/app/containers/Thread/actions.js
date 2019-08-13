/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_THREAD,
  LOAD_THREAD_SUCCESS,
  LOAD_THREAD_ERROR,
  LOAD_POSTS,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_ERROR,
  NEW_POST,
  NEW_POST_SUCCESS,
  NEW_POST_ERROR,
  DELETE_POST,
  DELETE_POST_SUCCESS,
  UPDATE_POST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_ERROR,
  VOTE_POST,
} from './constants'

/**
 * Load the thread List, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_THREAD
 */
export function loadThread(topicSlug, nextHref) {
  return {
    type: LOAD_THREAD,
    topicSlug,
    nextHref, // comments (posts)
  }
}

/**
 * Dispatched when the thread List are loaded by the request saga
 *
 * @param  {array} threadList The thread List data
 *
 * @return {object}      An action object with a type of LOAD_THREAD_SUCCESS passing the threadList
 */
export function threadLoaded(thread) {
  return {
    type: LOAD_THREAD_SUCCESS,
    thread,
  }
}

/**
 * Dispatched when loading the threadListitories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_THREAD_ERROR passing the error
 */
export function threadLoadingError(error) {
  return {
    type: LOAD_THREAD_ERROR,
    error,
  }
}

/**
 * Load the posts List, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_POST
 */
export function loadPosts(threadId, nextHref) {
  return {
    type: LOAD_POSTS,
    threadId,
    nextHref, // comments (posts)
  }
}

/**
 * Dispatched when the posts List are loaded by the request saga
 *
 * @param  {array} postList The post List data
 *
 * @return {object}      An action object with a type of LOAD_POST_SUCCESS passing the postList
 */
export function postsLoaded(postsList) {
  return {
    type: LOAD_POSTS_SUCCESS,
    postsList,
  }
}

/**
 * Dispatched when loading the postListitories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_POST_ERROR passing the error
 */
export function postsLoadingError(error) {
  return {
    type: LOAD_POSTS_ERROR,
    error,
  }
}

export function newPost(post) {
  return {
    type: NEW_POST,
    post,
  }
}

export function newPostSuccess(_newPost) {
  return {
    type: NEW_POST_SUCCESS,
    newPost: _newPost,
  }
}

export function newPostError(error) {
  return {
    type: NEW_POST_ERROR,
    error,
  }
}

export function updatePost(post) {
  return {
    type: UPDATE_POST,
    post,
  }
}

export function updatePostSuccess(_updatedPost) {
  return {
    type: UPDATE_POST_SUCCESS,
    updatedPost: _updatedPost,
  }
}

export function updatePostError(error) {
  return {
    type: UPDATE_POST_ERROR,
    error,
  }
}

export function votePost(post, vote) {
  return {
    type: VOTE_POST,
    post,
    vote,
  }
}

export function deletePost(post) {
  return {
    type: DELETE_POST,
    post,
  }
}

export function deletePostSuccess(_deletedPost) {
  return {
    type: DELETE_POST_SUCCESS,
    deletedPost: _deletedPost,
  }
}
