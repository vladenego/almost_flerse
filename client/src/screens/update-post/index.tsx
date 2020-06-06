import React, { FunctionComponent, useState, useEffect } from 'react'
import { TPost } from '~/types'
import './style.less'
import { useParams } from 'react-router-dom'
import { getPost, patchPost } from './api'

interface UpdatePostScreenProps {
  token: string
  setToken: (token: string) => any
}

export const UpdatePostScreen: FunctionComponent<UpdatePostScreenProps> = ({
  token,
  setToken,
}) => {
  const [post, setPost] = useState<TPost>()

  const { postId } = useParams()

  useEffect(() => {
    getPost(postId, token)
      .then((res) => res.json())
      .then((res) => {
        setPost(res.post)
      })
      .catch((error) => console.log(error))
  }, [])

  const onSubmit = (event) => {
    // event.preventDefault()
    patchPost(postId, post, token)
      .then((res) => res.json())
      .then((res) => {
        setPost(res.post)
      })
      .catch((error) => console.log(error))
  }

  const onTitleChange = (event) => {
    setPost({ ...post, title: event.target.value })
  }

  const onDescriptionChange = (event) => {
    setPost({ ...post, description: event.target.value })
    if (event.target.value.length >= 150) {
      alert('you have reached a limit of 150')
    }
  }

  console.log(post)

  return (
    <main id="add-screen">
      {post ? (
        <div>
          <h1>Update Post</h1>
          <form onSubmit={(event) => onSubmit(event)}>
            <label htmlFor="title">Title</label>
            <br />
            <input
              name="title"
              type="text"
              required
              value={post.title}
              onChange={(event) => onTitleChange(event)}
            />
            <br />
            <label htmlFor="description">Description</label>
            <br />
            <textarea
              name="description"
              id=""
              required
              value={post.description}
              onChange={(event) => onDescriptionChange(event)}
              maxLength={150}
            ></textarea>
            <br />
            <input type="submit" />
          </form>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  )
}
