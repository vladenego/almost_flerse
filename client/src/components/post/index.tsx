import React, { FunctionComponent, useEffect, useState } from 'react'
import './styles.less'
import { TPost } from '~/types'

interface postProps {
  post: TPost
  token: string
  setToken: (token: string) => any
}

export const Post: FunctionComponent<postProps> = ({ post, token, setToken }) => {
  const [author, setaAuthor] = useState('')

  //gets user_id and returns its username
  // const authorHandler = (userID: string) => {
  //   fetch(`http://localhost:8080/users/${userID}`)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setaAuthor(res.user.username)
  //     })
  // }

  useEffect(() => {
    fetch(`http://localhost:8080/users/${post.userId}`, {
      headers: {
        'auth-token': token,
      },
    })
      .then((res) => res.json())
      .then((res) => setaAuthor(res.user.username))
  }, [])

  console.log(author)

  return (
    <div className="post">
      <a href={`http://localhost:1234/feed/${post._id}`}>
        <h1>{post.title}</h1>
      </a>

      <p>{post.description}</p>
      <hr />
      <p>
        <span>author: </span>
        <a href={`http://localhost:1234/u/${author}`}>{author}</a>
      </p>
    </div>
  )
}
