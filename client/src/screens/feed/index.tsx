import React, { FunctionComponent, useState, useEffect } from 'react'
import { Post } from '~/components/post/index'

interface FeedScreenProps {
  token: string
  setToken: (token: string) => any
}

export const FeedScreen: FunctionComponent<FeedScreenProps> = ({ token, setToken }) => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetch('http://localhost:8080/posts', {
      headers: {
        'auth-token': token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.posts)

        setPosts(res.posts)
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <main id="feed-screen">
      <h3>FEED</h3>
      <div className="postList">
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
    </main>
  )
}
