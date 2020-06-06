import React, { FunctionComponent, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { TUser } from '~/types'
import { TToken } from '~/types'
import { UserPost } from '~/components/'
import { getUserAndPosts } from './api'
import './style.less'
import { format } from 'url'
import jwt from 'jsonwebtoken'

interface UserScreenProps {
  token: string
  setToken: (token: string) => any
}

export const UserScreen: FunctionComponent<UserScreenProps> = ({ token, setToken }) => {
  const [user, setUser] = useState<TUser>()
  const [posts, setPosts] = useState([])
  const [userNotFound, setUserNotFound] = useState('')
  const [admin, setAdmin] = useState(false)
  const { usernameOrId } = useParams()

  useEffect(() => {
    getUserAndPosts(usernameOrId, token, setAdmin, setUser, setPosts)
  }, [])

  const onDeletePost = (postId) => {
    fetch(`http://localhost:8080/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'auth-token': token,
      },
    })
      .then((res) => res.json()) // or res.json()
      .then((res) => {
        setPosts(posts.filter((post) => post._id != postId))
      })
  }

  if (userNotFound) return <div>User Not Found</div>
  if (!user) return <div>Loading...</div>

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
            post={post}
            token={token}
            setToken={setToken}
            admin={admin}
            onDeletePost={onDeletePost}
          />
        ))}
      </div>
    </main>
  )
}
