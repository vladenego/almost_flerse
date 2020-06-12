import { Request, Response } from 'express'
import { Db } from 'mongodb'

/** creates a new post, returns post id */
export const postCommentHandler = (database: Db) => async (
  req: Request,
  res: Response,
) => {
  try {
    console.log(req.body)
    const { postId, comment, username } = req.body

    const result = await database.collection('comments').insertOne({
      postId,
      comment,
      username,
      date: Date.now(),
    })

    return res.status(200).json({
      commentId: result.insertedId,
    })
  } catch (error) {
    console.error('failed to create post', error)

    return res.status(500).send({})
  }
}