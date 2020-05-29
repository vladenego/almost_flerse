import React, { FunctionComponent } from 'react'
import './styles.less'
import { TPost } from '~/types'

interface postProps {
  post: TPost
}

export const Post: FunctionComponent<postProps> = ({ post }) => (
  <div className="post">
    <h1>{post.title}</h1>
    <p>{post.description}</p>
  </div>
)
