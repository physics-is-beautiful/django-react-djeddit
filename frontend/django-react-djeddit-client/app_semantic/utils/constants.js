export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount'
export const DAEMON = '@@saga-injector/daemon'
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount'

const conf = window.DJEDDIT_CONFIG
let API_URL_POSTFIX = ''
if (conf) {
  ;({ API_URL_POSTFIX } = conf)
}

export const API_PREFIX = `/api/v1/${API_URL_POSTFIX}`
