export const getPost = (postId: string, token: string) => {
  return fetch(`http://localhost:8080/posts/${postId}`, {
    headers: {
      'auth-token': token,
    },
  })
}
