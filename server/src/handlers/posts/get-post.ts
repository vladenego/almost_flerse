import { Request, Response } from 'express'
import { Db } from 'mongodb'

/** finds and returns a post by id */
export const getPostHandler = (database: Db) => async (req: Request, res: Response) => {
  const { postId } = req.params

  // TODO:
  // 1. find post by id
  // 2. return post

  return res.status(404).json({
    message: 'not implemented',
  })
}
