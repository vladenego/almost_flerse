import { Request, Response } from 'express'
import { Db, ObjectId } from 'mongodb'

/** finds and returns a post by id */
export const updatePostHandler = (database: Db) => async (
  req: Request,
  res: Response,
) => {
  const { postId } = req.params

  try {
    const { matchedCount } = await database.collection('posts').updateOne(
      { _id: new ObjectId(postId) },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
        },
      },
    )

    if (matchedCount === 0) {
      return res.status(404).json({
        message: 'failed to find post',
      })
    }

    return res.status(200).json({
      message: 'successfully updated post',
    })
  } catch (error) {
    console.error('failed to update post', error)

    return res.status(500).send({})
  }
}
