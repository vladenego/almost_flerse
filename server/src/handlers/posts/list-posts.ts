import { Request, Response } from 'express'
import { Db } from 'mongodb'

/** finds and returns a list of posts */
export const listPostsHandler = (database: Db) => async (req: Request, res: Response) => {
  // TODO:
  // 1. find all posts in database
  // 2. return posts

  return res.status(404).json({
    message: 'not implemented',
  })
}
