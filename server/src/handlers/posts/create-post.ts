import { Request, Response } from 'express'
import { Db } from 'mongodb'

/** creates a new post, returns post id */
export const createPostHandler = (database: Db) => async (
  req: Request,
  res: Response,
) => {
  try {
    const { title, description } = req.body

    const result = await database.collection('posts').insertOne({
      title,
      description,
      data: Date.now(),
    })

    return res.status(200).json({
      postID: result.insertedId,
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    })
  }
}
