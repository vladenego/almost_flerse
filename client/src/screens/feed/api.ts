export const getPosts = (token: string) => {
  return fetch('http://localhost:8080/posts', {
    headers: {
      'auth-token': token,
    },
  })
}
