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

  // if (!post) return <div>Loading...</div>
  console.log(title)
  console.log(description)

  return (
    <main id="add-screen">
      <h1>Add Post</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <input type="text" onChange={(e) => setTitle(e.target.value)} required />
        <br />
        <textarea
          name=""
          id=""
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <br />
        <input type="submit" />
      </form>
    </main>
  )
}
