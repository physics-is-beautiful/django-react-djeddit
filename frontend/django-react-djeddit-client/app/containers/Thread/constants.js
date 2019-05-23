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

export const LOAD_THREAD = 'djeddit/ThreadList/LOAD_THREAD'
export const LOAD_THREAD_SUCCESS = 'djeddit/ThreadList/LOAD_THREAD_SUCCESS'
export const LOAD_THREAD_ERROR = 'djeddit/ThreadList/LOAD_THREAD_ERROR'

export const LOAD_POSTS = 'djeddit/ThreadList/LOAD_POSTS'
export const LOAD_POSTS_SUCCESS = 'djeddit/ThreadList/LOAD_POSTS_SUCCESS'
export const LOAD_POSTS_ERROR = 'djeddit/ThreadList/LOAD_POSTS_ERROR'
