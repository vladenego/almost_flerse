import React, { FunctionComponent, useState, useEffect } from 'react'
import { Post } from '~/components/post/index'
import { getPosts } from './api'
import './style.less'

interface FeedScreenProps {
  token: string
  setToken: (token: string) => any
}

export const FeedScreen: FunctionComponent<FeedScreenProps> = ({ token, setToken }) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getPosts(token, setPosts)
  }, [])

  return (
    <main id="feed-screen">
      <h3>FEED</h3>
      <div className="postList">
        {posts.map((post) => {
          return <Post post={post} key={post._id} token={token} setToken={setToken} />
        })}
      </div>
    </main>
  )
}
