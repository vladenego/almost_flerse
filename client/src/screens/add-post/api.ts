import { TPost } from '~/types'

const token = localStorage.getItem('token')

export const sendPost = (post: TPost, token: string) => {
  return fetch(`http://localhost:8080/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify(post),
  })
}
