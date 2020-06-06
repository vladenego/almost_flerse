import React, { FunctionComponent, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { TPost } from '~/types'
import { getPost } from './api'
import './style.less'

interface PostsScreenProps {
  token: string
  setToken: (token: string) => any
}

export const PostsScreen: FunctionComponent<PostsScreenProps> = ({ token, setToken }) => {
  const [post, setPost] = useState<TPost>()
  const { postId } = useParams()

  useEffect(() => {
    getPost(postId, token)
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
      <p>
        <span>author: </span>
        <a href={`http://localhost:1234/u/${post.author}`}>{post.author}</a>
      </p>
    </main>
  )
}
