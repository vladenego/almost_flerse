export const authRequest = (
  mode: string,
  email: string,
  login: string,
  password: string,
) => {
  return fetch(`http://localhost:8080/auth/${mode}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body:
      mode === 'login'
        ? JSON.stringify({ login, password })
        : JSON.stringify({ email: email, username: login, password: password }),
  })
}
