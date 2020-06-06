export const authRequest = (
  mode: string,
  email: string,
  login: string,
  password: string,
  setToken,
  setError,
) => {
  fetch(`http://localhost:8080/auth/${mode}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body:
      mode === 'login'
        ? JSON.stringify({ login, password })
        : JSON.stringify({ email: email, username: login, password: password }),
  })
    .then(async (res) => {
      if (res.ok) {
        return await res.json()
      }

      throw await res.json()
    })
    .then((res) => {
      setToken(res.token)

      localStorage.setItem('token', res.token)
    })
    .catch((error) => {
      setError(error.message)

      console.error('failed to log in', error)
    })
}
