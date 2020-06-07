import React, { FunctionComponent, useEffect, useState } from 'react'
import { TPost } from '~/types'
import './styles.less'

interface UserPostProps {
  admin: boolean
  post: TPost
  onDeletePost: () => any
}

export const UserPost: FunctionComponent<UserPostProps> = ({
  post,
  admin,
  onDeletePost,
}) => {
  const [deleteVisible, setDeleteVisible] = useState(false)

  return (
    <div className="post">
      <a href={`http://localhost:1234/feed/${post._id}`}>
        <h1>{post.title}</h1>
      </a>

      <p>{post.description}</p>

      {admin ? (
        <div className="post-controller">
          {deleteVisible ? (
            <div>
              <p>are you sure you want to delete</p>
              <button
                className="user-post-btn"
                onClick={() => {
                  setDeleteVisible(false)
                  onDeletePost()
                }}
              >
                yes
              </button>
              <button className="user-post-btn" onClick={() => setDeleteVisible(false)}>
                no
              </button>
            </div>
          ) : (
            <div>
              <a
                id="edit-post-link"
                href={`http://localhost:1234/feed/update/${post._id}`}
              >
                edit
              </a>
              <button
                id="delete-post-btn"
                onClick={() => {
                  setDeleteVisible(true)
                }}
              >
                delete
              </button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}
