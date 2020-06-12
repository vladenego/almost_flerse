import { TComment, TUser } from '~/types'

export const getPost = (postId: string, token: string) => {
  return fetch(`http://localhost:8080/posts/${postId}`, {
    headers: {
      'auth-token': token,
    },
  })
}
export const getComments = (postId: string, token: string) => {
  return fetch(`http://localhost:8080/comments/${postId}`, {
    headers: {
      'auth-token': token,
    },
  })
}
export const sendComment = (
  postId: string,
  user: TUser,
  postComment: TComment,
  token: string,
) => {
  return fetch(`http://localhost:8080/comments/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify({
      postId,
      userId: user._id,
      comment: postComment.comment,
    }),
  })
}
