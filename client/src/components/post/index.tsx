import React, { FunctionComponent, useEffect, useState } from 'react'
import { TPost, TUser } from '~/types'
import './styles.less'
import { Link } from 'react-router-dom'

interface PostProps {
  post: TPost
  user: TUser
}

export const Post: FunctionComponent<PostProps> = ({ post, user }) => {
  return (
    <div className="post">
      <a href={`http://localhost:1234/feed/${post._id}`}>
        <h1>{post.title}</h1>
      </a>

      <p>{post.description}</p>
      <hr />

      <p>
        <span>author: </span>
        <Link to={`/u/${user.username}`}>{user.username}</Link>
      </p>
    </div>
  )
}
