import React, { FunctionComponent, useState, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import jwt from 'jsonwebtoken'

import { UserPost } from '~/components'
import { TUser, TToken } from '~/types'
import { getUserAndPosts, deletePost } from './api'
import './style.less'

interface UserScreenProps {
  token: string
  setToken: (token: string) => any
}

export const UserScreen: FunctionComponent<UserScreenProps> = ({ token, setToken }) => {
  const { usernameOrId } = useParams()
  const decodedToken = useMemo(() => jwt.decode(token) as TToken, [token])

  const [user, setUser] = useState<TUser>(undefined)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getUserAndPosts(token, usernameOrId)
      .then(([user, posts]) => {
        setUser(user || null)
        setPosts(posts)
      })
      .catch(console.error)
  }, [])

  const onDeletePost = (postId: string) => {
    setPosts(posts.filter((post) => post._id !== postId))

    deletePost(token, postId).catch(console.error)
  }

  if (user === null) return <div>User Not Found</div>
  if (user === undefined) return <div>Loading...</div>

  return (
    <main id="user-screen">
      <h2>{user.username}</h2>
      <hr />
      <div className="user-header">
        <div className="user_title">email: {user.email}</div>
        <div className="user_description">username: {user.username}</div>
      </div>

      <div className="user-postsList">
        <h2>Posts</h2>
        <hr />
        {posts.map((post) => (
          <UserPost
            key={post._id}
            post={post}
            token={token}
            setToken={setToken}
            admin={decodedToken._id === user._id}
            onDeletePost={onDeletePost}
          />
        ))}
      </div>
    </main>
  )
}
