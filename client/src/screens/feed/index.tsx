import React, { FunctionComponent, useState, useEffect } from 'react'
import { Post } from '~/components/post/index'
import { getPosts } from './api'
import './style.less'
import { TPost, TUser } from '~/types'

interface FeedScreenProps {
  token: string
  setToken: (token: string) => any
}

export const FeedScreen: FunctionComponent<FeedScreenProps> = ({ token, setToken }) => {
  const [posts, setPosts] = useState<TPost[]>([])
  const [users, setUsers] = useState<TUser[]>([])

  useEffect(() => {
    getPosts(token)
      .then((res) => res.json())
      .then((res) => {
        setUsers(res.users)
        setPosts(res.posts)
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <main id="feed-screen">
      <h3>FEED</h3>
      <div className="postList">
        {posts.map((post) => (
          <Post
            post={post}
            user={users.find((user) => user._id === post.userId)}
            key={post._id}
          />
        ))}
      </div>
    </main>
  )
}
