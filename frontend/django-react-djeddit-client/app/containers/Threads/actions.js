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
  LOAD_THREADS,
  LOAD_THREADS_SUCCESS,
  LOAD_THREADS_ERROR,
} from './constants'

/**
 * Load the threads List, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_THREADS
 */
export function loadThreads(topicSlug, nextHref) {
  return {
    type: LOAD_THREADS,
    topicSlug,
    nextHref,
  }
}

/**
 * Dispatched when the threads List are loaded by the request saga
 *
 * @param  {array} threadsList The threads List data
 *
 * @return {object}      An action object with a type of LOAD_THREADS_SUCCESS passing the threadsList
 */
export function threadsListLoaded(threadsList) {
  return {
    type: LOAD_THREADS_SUCCESS,
    threadsList,
  }
}

/**
 * Dispatched when loading the threadsListitories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_THREADS_ERROR passing the error
 */
export function threadsListLoadingError(error) {
  return {
    type: LOAD_THREADS_ERROR,
    error,
  }
}
