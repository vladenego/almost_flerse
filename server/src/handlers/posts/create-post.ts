import { Request, Response } from 'express'
import { Db } from 'mongodb'

/** creates a new post, returns post id */
export const createPostHandler = (database: Db) => async (
  req: Request,
  res: Response,
) => {
  try {
    const { title, description, content } = req.body

    const result = await database.collection('posts').insertOne({
      title,
      description,
      userId: req.user._id,
      content,
      date: Date.now(),
    })

    return res.status(200).json({
      postID: result.insertedId,
    })
  } catch (error) {
    console.error('failed to create post', error)

    return res.status(500).send({})
  }
}
