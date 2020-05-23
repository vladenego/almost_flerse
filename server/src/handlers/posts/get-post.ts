import { Request, Response } from 'express'
import { Db } from 'mongodb'
import { ObjectId } from 'mongodb'

/** finds and returns a post by id */
export const getPostHandler = (database: Db) => async (req: Request, res: Response) => {
  const { postId } = req.params

  try {
    // TODO:
    // 1. find post by id
    // 2. return post
    const result = await database
      .collection('posts')
      .findOne({ _id: new ObjectId(postId) })

    return res.status(200).json({
      post: result,
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error',
    })
  }
}
