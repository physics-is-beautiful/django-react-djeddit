const conf = window.DJEDDIT_CONFIG

let ANON_AS_USER_OBJECT = false

if (conf) {
  ;({ ANON_AS_USER_OBJECT } = conf)
}

export const settings = {
  anonAsUserObject: ANON_AS_USER_OBJECT,
}
