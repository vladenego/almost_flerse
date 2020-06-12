import { Request, Response } from 'express'
import { Db, ObjectId } from 'mongodb'
import { TPost, TUser } from '~/types'
import { log } from 'util'

/** finds and returns a list of posts */
export const getCommentsHandler = (database: Db) => async (
  req: Request,
  res: Response,
) => {
  try {
    const comments = await database
      .collection('comments')
      .find({ postId: req.params.postId })
      .toArray()

    const users = await database
      .collection('users')
      .find<TUser>({
        _id: {
          $in: comments.map((comment) => new ObjectId(comment.userId)), // array of id strings
        },
      })
      .toArray()

    return res.status(200).json({
      comments,
      users,
    })
  } catch (error) {
    console.error('failed to list comments', error)

    return res.status(500).send({})
  }
}
