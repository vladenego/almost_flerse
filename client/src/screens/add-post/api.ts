import { TPost } from '~/types'

export const sendPost = (post: Partial<TPost>, token: string) => {
  return fetch(`http://localhost:8080/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify(post),
  })
}
