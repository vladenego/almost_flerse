import { TPost, TUser } from '~/types'

export const getUserAndPosts = (
  token: string,
  usernameOrId: string,
): Promise<[TUser, TPost[]]> => {
  // fetch user and get promise
  const userPromise = fetch(`http://localhost:8080/users/${usernameOrId}`, {
    headers: {
      'auth-token': token,
    },
  })
    .then((res) => res.json())
    .then((res) => res.user)

  // fetch posts and get promise
  const postsPromise = fetch(`http://localhost:8080/posts?tag=undefined`, {
    headers: {
      'auth-token': token,
    },
  })
    .then((res) => res.json())
    .then((res) => res.posts)

  // complete all promises
  return Promise.all<TUser, TPost[]>([userPromise, postsPromise]).then(
    ([user, posts]) => [
      user,
      // filter posts by user
      posts.filter((post) => post.userId === user?._id),
    ],
  )
}

export const deletePost = (token: string, postId: string) =>
  fetch(`http://localhost:8080/posts/${postId}`, {
    method: 'DELETE',
    headers: { 'auth-token': token },
  }).then((res) => res.json()) // or res.json()
