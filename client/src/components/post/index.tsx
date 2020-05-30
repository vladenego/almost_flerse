import React, { FunctionComponent } from 'react'
import './styles.less'
import { TPost } from '~/types'

interface postProps {
  post: TPost
}

export const Post: FunctionComponent<postProps> = ({ post }) => (
  <div className="post">
    <a href={`http://localhost:1234/feed/${post._id}`}>
      <h1>{post.title}</h1>
    </a>

    <p>{post.description}</p>
  </div>
)
