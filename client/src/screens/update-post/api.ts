import { TPost } from '~/types'

export const getPost = (postId: string, token: string) => {
  return fetch(`http://localhost:8080/posts/${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': token,
    },
  })
}

export const patchPost = (postId: string, post: TPost, token: string) => {
  return fetch(`http://localhost:8080/posts/${postId}`, {
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
}
