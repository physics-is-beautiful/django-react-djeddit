/*
 * Home Actions
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

import { NEW_TOPIC, NEW_TOPIC_SUCCESS } from './constants'

/**
 * newTopic, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function newTopic(formData) {
  return {
    type: NEW_TOPIC,
    formData,
  }
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function newTopicSuccess(user) {
  return {
    type: NEW_TOPIC_SUCCESS,
    user,
  }
}
