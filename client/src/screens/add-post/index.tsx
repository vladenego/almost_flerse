import React, { FunctionComponent, useState } from 'react'
import { TPost } from '~/types'
import { sendPost } from './api'
import './style.less'

interface AddScreenProps {
  token: string
  setToken: (token: string) => any
}

export const AddScreen: FunctionComponent<AddScreenProps> = ({ token, setToken }) => {
  const [post, setPost] = useState<TPost>()

  const onSubmit = (e) => {
    e.preventDefault()
    sendPost(post, token)
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
      })
      .catch((error) => console.log(error))
  }

  const onDescriptionChange = (event) => {
    setPost({ ...post, description: event.target.value })
    if (event.target.value.length >= 150) {
      alert('you have reached a limit of 150')
    }
  }

  return (
    <main id="add-screen">
      <h1>Add Post</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <label htmlFor="title">Title</label>
        <br />
        <input
          name="title"
          type="text"
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          required
        />
        <br />
        <label htmlFor="description">Description</label>
        <br />
        <textarea
          name="description"
          id=""
          onChange={(event) => onDescriptionChange(event)}
          required
          maxLength={150}
        ></textarea>
        <br />
        <input type="submit" />
      </form>
    </main>
  )
}
