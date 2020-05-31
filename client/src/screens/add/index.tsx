import React, { FunctionComponent, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { TPost } from '~/types'
import './style.less'
import { log } from 'util'

interface AddScreenProps {
  token: string
  setToken: (token: string) => any
}

export const AddScreen: FunctionComponent<AddScreenProps> = ({ token, setToken }) => {
  // const [post, setPost] = useState<TPost>()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const onSubmit = (e) => {
    e.preventDefault()
    fetch(`http://localhost:8080/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token,
      },
      body: JSON.stringify({
        title: title,
        description: description,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
      })
      .catch((error) => console.log(error))
  }

  const descriptionHandler = (event) => {
    setDescription(event.target.value)
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
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <label htmlFor="description">Description</label>
        <br />
        <textarea
          name="description"
          id=""
          onChange={(event) => descriptionHandler(event)}
          required
          maxLength={150}
        ></textarea>
        <br />
        <input type="submit" />
      </form>
    </main>
  )
}
