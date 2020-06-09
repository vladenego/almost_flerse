import React, { FunctionComponent, useState, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import jwt from 'jsonwebtoken'

import { UserPost, Post } from '~/components'
import { TUser, TToken } from '~/types'
import { getUserAndPosts, deletePost } from './api'
import './style.less'

interface UserScreenProps {
  token: string
  user: TUser
}

export const UserScreen: FunctionComponent<UserScreenProps> = ({ token, user }) => {
  const { usernameOrId } = useParams()
  const [pageUser, setPageUser] = useState<TUser>(undefined)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getUserAndPosts(token, usernameOrId)
      .then(([user, posts]) => {
        setPageUser(user || null)
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
      <h2 className="user-username">{user.username}</h2>
      <hr />
      <div className="user-header">
        <div className="user_title">email: {user.email}</div>
        <div className="user_description">username: {user.username}</div>
      </div>

      <div className="user-postsList">
        <h2 className="user-postsList-title">Posts</h2>
        <hr />
        {posts.map((post) => (
          <UserPost
            key={post._id}
            post={post}
            admin={user._id === pageUser._id}
            onDeletePost={() => onDeletePost(post._id)}
          />
        ))}
      </div>
    </main>
  )
}
