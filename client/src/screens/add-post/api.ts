import { TPost } from '~/types'

const token = localStorage.getItem('token')

export const sendPost = (post: TPost, token: string) => {
  fetch(`http://localhost:8080/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify(post),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
    })
    .catch((error) => console.log(error))
}
