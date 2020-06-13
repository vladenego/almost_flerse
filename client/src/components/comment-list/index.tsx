import React, { FunctionComponent } from 'react'
import { Comment } from '~/components/'
import { TUser, TComment } from '~/types'
import './styles.less'

interface CommentListProps {
  commentsAndUsers: {
    comments: TComment[]
    users: TUser[]
  }
}

export const CommentList: FunctionComponent<CommentListProps> = ({
  commentsAndUsers,
}) => (
  <div className="block-comments">
    <h2 className="block-comments__title">Comments </h2>

    {commentsAndUsers.comments ? (
      commentsAndUsers.comments.map((comment: TComment) => (
        <Comment
          comment={comment}
          user={commentsAndUsers.users.find((user: TUser) => user._id === comment.userId)}
        />
      ))
    ) : (
      <div>loading...</div>
    )}
  </div>
)
