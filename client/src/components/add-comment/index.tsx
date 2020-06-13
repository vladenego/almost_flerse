import React, { FunctionComponent } from 'react'
import './styles.less'
import { TUser, TComment } from '~/types'

interface AddCommentProps {
  token: string
  user: TUser
  setToken: (token: string) => any
  onSubmitComment: any
  setPostComment: any
  postComment: TComment
  postId: string
}

export const AddComment: FunctionComponent<AddCommentProps> = ({
  token,
  user,
  setToken,
  onSubmitComment,
  setPostComment,
  postComment,
  postId,
}) => (
  <div className="add-comment">
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
  </div>
)
