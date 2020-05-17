import { Request, Response } from 'express'
import { Db } from 'mongodb'

/** creates a new post, returns post id */
export const createPostHandler = (database: Db) => async (
  req: Request,
  res: Response,
) => {
  const { post } = req.body

  // TODO:
  // 1. create a new post for user
  // 2. get created post id
  // 3. return post id

  return res.status(404).json({
    message: 'not implemented',
  })
}
