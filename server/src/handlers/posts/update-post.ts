import { Request, Response } from 'express'
import { Db } from 'mongodb'
import { ObjectId } from 'mongodb'

/** finds and returns a post by id */
export const updatePostHandler = (database: Db) => async (
  req: Request,
  res: Response,
) => {
  const { postId } = req.params

  try {
    const post = await database.collection('posts').findOneAndUpdate(
      { _id: new ObjectId(postId) },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          date: Date.now(),
        },
      },
    )

    console.log(post)

    return res.status(200).json({
      updatedPost: post,
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error',
    })
  }
}
