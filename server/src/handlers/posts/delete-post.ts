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
    const { deletedCount } = await database
      .collection('posts')
      .deleteOne({ _id: new ObjectId(postId) })

    if (deletedCount == 1)
      return res.status(200).json({
        message: 'Post was deleted',
      })
    return res.status(404).json({
      message: 'Post is not found',
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    })
  }
}
