export const getPosts = (token: string, setPosts) => {
  fetch('http://localhost:8080/posts', {
    headers: {
      'auth-token': token,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res.posts)

      setPosts(res.posts)
    })
    .catch((error) => console.log(error))
}
