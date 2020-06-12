import { Request, Response } from 'express'
import { Db, ObjectId } from 'mongodb'
import { TPost, TUser } from '~/types'
import { log } from 'util'

/** finds and returns a list of posts */
export const listPostsHandler = (database: Db) => async (req: Request, res: Response) => {
  try {
    const posts = await database
      .collection('posts')
      .find<TPost>(
        req.query.tag == 'undefined' || req.query.tag == '' ? {} : { tag: req.query.tag },
      )
      .skip(parseInt(req.query.skip as string))
      .limit(parseInt(req.query.limit as string))
      .toArray()

    const users = await database
      .collection('users')
      .find<TUser>({
        _id: {
          $in: posts.map((post) => new ObjectId(post.userId)), // array of id strings
        },
      })
      .toArray()

    return res.status(200).json({
      posts,
      users,
    })
  } catch (error) {
    console.error('failed to list posts', error)

    return res.status(500).send({})
  }
}
