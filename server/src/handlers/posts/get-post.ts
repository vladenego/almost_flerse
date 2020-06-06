import { Request, Response } from 'express'
import { Db, ObjectId } from 'mongodb'
import { TPost, TUser } from '~/types'

/** finds and returns a post by id */
export const getPostHandler = (database: Db) => async (req: Request, res: Response) => {
  const { postId } = req.params

  try {
    const post = await database.collection('posts').findOne<TPost>({
      _id: new ObjectId(postId),
    })
    // send 404 if post was not found
    if (!post) {
      return res.status(404).json({
        message: 'failed to find post',
      })
    }

    const user = await database
      .collection('users')
      .findOne<TUser>({ _id: new ObjectId(post.userId) })

    return res.status(200).json({ post, user })
  } catch (error) {
    console.error('failed to get post', error)

    return res.status(500).send({})
  }
}
