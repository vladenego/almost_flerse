import { Request, Response } from 'express'
import { Db, ObjectId } from 'mongodb'

/** finds and returns a post by id */
export const getPostHandler = (database: Db) => async (req: Request, res: Response) => {
  const { postId } = req.params

  try {
    const post = await database.collection('posts').findOne({
      _id: new ObjectId(postId),
    })

    // send 404 if post was not found
    if (!post) {
      return res.status(404).json({
        message: 'failed to find post',
      })
    }

    return res.status(200).json({ post })
  } catch (error) {
    console.error('failed to get post', error)

    return res.status(500).send({})
  }
}
