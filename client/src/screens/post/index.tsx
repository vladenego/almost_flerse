import React, { FunctionComponent, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { TPost } from '~/types'
import './style.less'

interface PostScreenProps {
  token: string
  setToken: (token: string) => any
}

export const PostScreen: FunctionComponent<PostScreenProps> = ({ token, setToken }) => {
  const [post, setPost] = useState<TPost>()
  const { postId } = useParams()
  useEffect(() => {
    fetch(`http://localhost:8080/posts/${postId}`, {
      headers: {
        'auth-token': token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        setPost(res.post)
      })
      .catch((error) => console.log(error))
  }, [])
  if (!post) return <div>Loading...</div>
  return (
    <main id="post-screen">
      <div className="post_title">{post.title}</div>
      <div className="post_description">{post.description}</div>
    </main>
  )
}
