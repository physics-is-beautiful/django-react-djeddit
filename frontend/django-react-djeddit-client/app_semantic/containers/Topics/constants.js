/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_TOPICS = 'djeddit/Topics/LOAD_TOPICS'
export const LOAD_TOPICS_SUCCESS = 'djeddit/Topics/LOAD_TOPICS_SUCCESS'
export const LOAD_TOPICS_ERROR = 'djeddit/Topics/LOAD_TOPICS_ERROR'

export const LOAD_TOPIC = 'djeddit/Topics/LOAD_TOPIC'
export const LOAD_TOPIC_SUCCESS = 'djeddit/Topics/LOAD_TOPIC_SUCCESS'
export const LOAD_TOPIC_ERROR = 'djeddit/Topics/LOAD_TOPIC_ERROR'
