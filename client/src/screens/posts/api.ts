export const getPost = (postId: string, token: string, setPost) => {
  fetch(`http://localhost:8080/posts/${postId}`, {
    headers: {
      'auth-token': token,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      setPost(res.post)
    })
    .catch((error) => console.log(error))
}
