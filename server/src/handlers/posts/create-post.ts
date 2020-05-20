import { Request, Response } from 'express'
import { Db } from 'mongodb'
import { log } from 'util'

/** creates a new post, returns post id */
export const createPostHandler = (database: Db) => async (
  req: Request,
  res: Response,
) => {
  try {
    // TODO:
    // 1. create a new post for user
    // 2. get created post id
    // 3. return post id

    const { title, description } = req.body

    const createPost = await database.collection('posts').insertOne({
      title,
      description,
      data: Date.now()
    })
    
    return res.status(200).json({
      postID: createPost.insertedId
    })

  } catch (error) {
    return res.status(404).json({
      message: 'not implemented',
    })
  }
}
