import { Request, Response } from 'express'
import { Db } from 'mongodb'

/** finds and returns a list of posts */
export const listPostsHandler = (database: Db) => async (req: Request, res: Response) => {
  try {
    const posts = await database.collection('posts').find().toArray()

    return res.status(200).json({
      posts: posts,
    })
  } catch (error) {
    console.error('failed to list posts', error)

    return res.status(500).send({})
  }
}
