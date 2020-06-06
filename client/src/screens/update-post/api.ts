import { TPost } from '~/types'

export const getPost = (postId: string, setPost, token: string) => {
  fetch(`http://localhost:8080/posts/${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': token,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      setPost(res.post)
    })
    .catch((error) => console.log(error))
}

export const patchPost = (postId: string, post: TPost, setPost, token: string) => {
  fetch(`http://localhost:8080/posts/${postId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify({
      title: post.title,
      description: post.description,
      date: Date.now(),
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      setPost(res.post)
    })
    .catch((error) => console.log(error))
}
