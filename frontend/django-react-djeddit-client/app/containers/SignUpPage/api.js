function* signUpCall(formData) {
  const respone = yield fetch('http://127.0.0.1:8000/signup', {
    method: 'POST',
  })
  return yield respone.status === 200
}

export const Api = { signUpCall }
