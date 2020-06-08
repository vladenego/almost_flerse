import React, { FunctionComponent, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { TPost, TUser } from '~/types'
import { getPost } from './api'
import './style.less'
import '../../../node_modules/react-quill/dist/quill.snow.css'

interface PostsScreenProps {
  token: string
  setToken: (token: string) => any
}

export const PostsScreen: FunctionComponent<PostsScreenProps> = ({ token, setToken }) => {
  const [post, setPost] = useState<TPost>()
  const [user, setUser] = useState<TUser>()
  const { postId } = useParams()

  useEffect(() => {
    getPost(postId, token)
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        setUser(res.user)
        setPost(res.post)
      })
      .catch((error) => console.log(error))
  }, [])

  if (!post || !user) return <div>Loading...</div>

  return (
    <main id="post-screen">
      <div className="post_title">{post.title}</div>
      <hr />
      <div className="ql-editor" dangerouslySetInnerHTML={{ __html: post.content }} />
      <hr />
      <p>
        <span>author: </span>
        <a href={`http://localhost:1234/u/${user.username}`}>{user.username}</a>
      </p>
    </main>
  )
}
