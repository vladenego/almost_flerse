import React, { FunctionComponent, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { TPost, TUser, TComment } from '~/types'
import { getPost, getComments, sendComment } from './api'
import './style.less'

import 'react-quill/dist/quill.snow.css'
import { Comment } from '~/components/comment'
import { CommentList } from '~/components/'
import { AddComment } from '~/components/'

interface PostScreenProps {
  user: TUser
  token: string
  setToken: (token: string) => any
}

export const PostScreen: FunctionComponent<PostScreenProps> = ({
  user,
  token,
  setToken,
}) => {
  const [post, setPost] = useState<TPost>()
  const [postUser, setPostUser] = useState<TUser>()
  const [comments, setComments] = useState([])
  const [users, setUsers] = useState([])
  const [postComment, setPostComment] = useState<TComment>()
  const [commentsAndUsers, setCommentsAndUsers] = useState({
    comments: [],
    users: [],
  })

  const { postId } = useParams()

  useEffect(() => {
    getPost(postId, token)
      .then((res) => res.json())
      .then((res) => {
        setPostUser(res.user)
        setPost(res.post)
      })
      .catch((error) => console.log(error))

    getComments(postId, token)
      .then((res) => res.json())
      .then((res) => {
        setCommentsAndUsers({
          comments: res.comments,
          users: res.users,
        })
      })
      .catch((error) => console.log(error))
  }, [])

  const onSubmitComment = (
    event: React.FormEvent<EventTarget>,
    postId: string,
    token: string,
  ) => {
    event.preventDefault()

    sendComment(postId, user, postComment, token)
      .then((res) => res.json())
      .then((res) => {
        res.commentId
          ? getComments(postId, token)
              .then((res) => res.json())
              .then((res) => {
                setCommentsAndUsers(res)
              })
              .catch((error) => console.log(error))
          : 'что-то пошло не так'
      })
  }

  if (!post || !postUser) return <div>Loading...</div>

  console.log(comments)
  console.log(users)

  if (comments == undefined || users == undefined) return <div>Loading...</div>
  if (comments == null || users == null) return <div>Not found...</div>

  return (
    <main id="post-screen">
      {comments && users ? (
        <div>
          <div className="block-post">
            <div className="post_title">{post.title}</div>
            <hr />
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <hr />
            <p>
              <span>author: </span>
              <a href={`http://localhost:1234/u/${postUser.username}`}>
                {postUser.username}
              </a>
            </p>
          </div>
          <CommentList commentsAndUsers={commentsAndUsers} />
          <AddComment
            token={token}
            user={user}
            setToken={setToken}
            onSubmitComment={onSubmitComment}
            setPostComment={setPostComment}
            postComment={postComment}
            postId={postId}
          />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  )
}
