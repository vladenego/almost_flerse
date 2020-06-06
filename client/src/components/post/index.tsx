import React, { FunctionComponent, useEffect, useState } from 'react'
import { TPost } from '~/types'
import './styles.less'

interface PostProps {
  post: TPost
  token: string
  setToken: (token: string) => any
}

export const Post: FunctionComponent<PostProps> = ({ post, token, setToken }) => {
  return (
    <div className="post">
      <a href={`http://localhost:1234/feed/${post._id}`}>
        <h1>{post.title}</h1>
      </a>

      <p>{post.description}</p>
      <hr />
      <p>
        <span>author: </span>
        <a href={`http://localhost:1234/u/${post.author}`}>{post.author}</a>
      </p>
    </div>
  )
}
