import jwt from 'jsonwebtoken'
import { TToken } from '~/types'

export const getUserAndPosts = (
  usernameOrId: string,
  token: string,
  setAdmin,
  setUser,
  setPosts,
) => {
  // fetch user and get promise
  const userPromise = fetch(`http://localhost:8080/users/${usernameOrId}`, {
    headers: {
      'auth-token': token,
    },
  }).then((res) => res.json())

  // fetch posts and get promise
  const postsPromise = fetch(`http://localhost:8080/posts`, {
    headers: {
      'auth-token': token,
    },
  }).then((res) => res.json())

  // complete all promises
  Promise.all([userPromise, postsPromise]).then(([user, posts]) => {
    const decodedToken = jwt.decode(token) as TToken

    if (user.user._id == decodedToken._id) {
      setAdmin(true)
    }

    setUser(user.user)

    const userPosts = posts.posts.filter((post) => post.userId === user.user._id)
    setPosts(userPosts)
  })
}
