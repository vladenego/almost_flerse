import { Request, Response } from 'express'
import { Db, ObjectId } from 'mongodb'
import { log } from 'util'
import { stringify } from 'querystring'

/** finds and returns a list of posts */
export const listPostsHandler = (database: Db) => async (req: Request, res: Response) => {
  try {
    const posts = await database
      .collection('posts')
      .find()
      .skip(parseInt(req.query.skip as string))
      .limit(parseInt(req.query.limit as string))
      .toArray()

    const postsWithAuthorPromises = posts.map((post) =>
      database
        .collection('users')
        .findOne({ _id: new ObjectId(post.userId) })
        .then(({ username }) => ({ ...post, author: username })),
    )

    const postsWithAuthor = await Promise.all(postsWithAuthorPromises)

    return res.status(200).json({
      posts: postsWithAuthor,
    })
  } catch (error) {
    console.error('failed to list posts', error)

    return res.status(500).send({})
  }
}
