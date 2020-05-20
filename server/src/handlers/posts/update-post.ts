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
    const getPostById = await database
      .collection('posts')
      .findOneAndReplace(
        { _id: new ObjectId(postId) },
        { title: req.body.title, description: req.body.description, date: Date.now() },
      )

    console.log(getPostById)

    return res.status(200).json({
      updatedPost: getPostById,
    })
  } catch (error) {
    return res.status(404).json({
      message: 'not implemented',
    })
  }
}
