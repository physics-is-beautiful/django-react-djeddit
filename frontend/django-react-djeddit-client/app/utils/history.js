import { createBrowserHistory } from 'history'

let ROOT_URL = ''

const conf = window.DJEDDIT_CONFIG
if (conf) {
  ;({ ROOT_URL } = conf)
}

const history = createBrowserHistory({ basename: ROOT_URL })
export default history
