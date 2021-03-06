import { Request, Response } from 'express'
import { Db, ObjectId } from 'mongodb'

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

    if (deletedCount === 1) {
      return res.status(200).json({
        message: 'post was deleted',
      })
    }

    return res.status(404).json({
      message: 'failed to find post',
    })
  } catch (error) {
    console.error('failed to delete post', error)

    return res.status(500).send({})
  }
}
