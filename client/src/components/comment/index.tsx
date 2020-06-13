import React, { FunctionComponent } from 'react'
import dayjs from 'dayjs'
import { TUser, TComment } from '~/types'
import './styles.less'

interface CommentProps {
  comment: TComment
  user: TUser
}

export const Comment: FunctionComponent<CommentProps> = ({ comment, user }) => {
  return (
    <div className="comments-item">
      <div className="comments-item-header">
        <img className="comments-item__avatar" src="/img/tchami.jpg" alt="" />
        <div>
          <p className="comments-item__username">{user.username}</p>
          <p className="comments-item__date">
            {dayjs(comment.date).format('DD.MM.YYYY')}
          </p>
        </div>
      </div>
      <div className="comments-item-header-main">
        <p className="comments-item__text">{comment.comment}</p>
      </div>
    </div>
  )
}
