import React, { FunctionComponent, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { TPost, TUser, TComment } from '~/types'
import { getPost, getComments, sendComment } from './api'
import './style.less'
import dayjs from 'dayjs'
import '../../../node_modules/react-quill/dist/quill.snow.css'

interface PostsScreenProps {
  user: TUser
  token: string
  setToken: (token: string) => any
}

export const PostsScreen: FunctionComponent<PostsScreenProps> = ({
  user,
  token,
  setToken,
}) => {
  const [post, setPost] = useState<TPost>()
  const [userPost, setUserPost] = useState<TUser>()
  const [comments, setComments] = useState([])
  const [postComment, setPostComment] = useState<TComment>()
  const { postId } = useParams()

  useEffect(() => {
    getPost(postId, token)
      .then((res) => res.json())
      .then((res) => {
        setUserPost(res.user)
        setPost(res.post)
      })
      .catch((error) => console.log(error))

    getComments(postId, token)
      .then((res) => res.json())
      .then((res) => {
        setComments(res.comments)
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
        console.log(res)
        res.commentId
          ? getComments(postId, token)
              .then((res) => res.json())
              .then((res) => {
                setComments(res.comments)
              })
              .catch((error) => console.log(error))
          : 'что-то пошло не так'
      })
  }

  if (!post || !userPost) return <div>Loading...</div>
  console.log(comments)
  console.log(postComment)

  return (
    <main id="post-screen">
      <div className="block-post">
        <div className="post_title">{post.title}</div>
        <hr />
        <div className="ql-editor" dangerouslySetInnerHTML={{ __html: post.content }} />
        <hr />
        <p>
          <span>author: </span>
          <a href={`http://localhost:1234/u/${userPost.username}`}>{userPost.username}</a>
        </p>
      </div>

      <div className="block-comments">
        <h2 className="block-comments__title">Comments </h2>

        {comments ? (
          comments.map((comment) => (
            <div className="comments-item" key={comment}>
              <div className="comments-item-header">
                <img className="comments-item__avatar" src="/img/tchami.jpg" alt="" />
                <div>
                  <p className="comments-item__username">{comment.username}</p>
                  <p className="comments-item__date">
                    {dayjs(comment.date).format('DD.MM.YYYY')}
                  </p>
                </div>
              </div>
              <div className="comments-item-header-main">
                <p className="comments-item__text">{comment.comment}</p>
              </div>
            </div>
          ))
        ) : (
          <div>loading...</div>
        )}
      </div>

      <div className="block-comments">
        <h2 className="block-comments__title">Discussion</h2>
        <form
          className="block-comments__form"
          onSubmit={(event) => onSubmitComment(event, postId, token)}
        >
          <textarea
            name=""
            className="block-comments__textarea"
            id=""
            placeholder="text here..."
            onChange={(event) =>
              setPostComment({
                ...postComment,
                comment: event.target.value,
              })
            }
          ></textarea>
          <input className="block-comments__submit" type="submit" />
        </form>
      </div>
    </main>
  )
}
