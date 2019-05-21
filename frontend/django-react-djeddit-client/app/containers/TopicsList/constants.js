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

export const LOAD_TOPICS = 'djeddit/TopicsList/LOAD_TOPICS'
export const CLEAR_TOPICS = 'djeddit/TopicsList/CLEAR_TOPICS'
export const LOAD_TOPICS_SUCCESS = 'djeddit/TopicsList/LOAD_TOPICS_SUCCESS'
export const LOAD_TOPICS_ERROR = 'djeddit/TopicsList/LOAD_TOPICS_ERROR'
