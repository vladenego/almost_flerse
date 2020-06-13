export const getPosts = (token: string, tag: string) => {
  return fetch(`http://localhost:8080/posts?tag=${tag}`, {
    headers: {
      'auth-token': token,
    },
  })
}
