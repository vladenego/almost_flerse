import { Request, Response } from 'express'
import { Db } from 'mongodb'
import { ObjectId } from 'mongodb'

/** finds and returns a post by id */
export const deletePostHandler = (database: Db) => async (
  req: Request,
  res: Response,
) => {
  const { postId } = req.params

  try {
    const deletePost = await database
      .collection('posts')
      .deleteOne({ _id: new ObjectId(postId) })

    return res.status(200).json({
      message: 'Post was deleted',
    })
  } catch (error) {
    return res.status(500).json({
      message: error,
    })
  }
}
