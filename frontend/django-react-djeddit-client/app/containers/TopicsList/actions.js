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
  LOAD_TOPICS,
  LOAD_TOPICS_SUCCESS,
  LOAD_TOPICS_ERROR,
} from './constants'

/**
 * Load the topics List, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_TOPICS
 */
export function loadTopics() {
  return {
    type: LOAD_TOPICS,
  }
}

/**
 * Dispatched when the topics List are loaded by the request saga
 *
 * @param  {array} topicsList The topics List data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_TOPICS_SUCCESS passing the topicsList
 */
export function topicsListLoaded(topicsList, username) {
  return {
    type: LOAD_TOPICS_SUCCESS,
    topicsList,
    username,
  }
}

/**
 * Dispatched when loading the topicsListitories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_TOPICS_ERROR passing the error
 */
export function topicsListLoadingError(error) {
  return {
    type: LOAD_TOPICS_ERROR,
    error,
  }
}
