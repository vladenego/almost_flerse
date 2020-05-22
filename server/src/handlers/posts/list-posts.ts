import { Request, Response } from 'express'
import { Db } from 'mongodb'
import { log } from 'util'

/** finds and returns a list of posts */
export const listPostsHandler = (database: Db) => async (req: Request, res: Response) => {
  // TODO:
  // 1. find all posts in database
  // 2. return posts

  try {

    const posts = await database.collection('posts').find().toArray()
  

    return res.status(200).json({
      posts: posts
    })
      
  } catch (error) {
    return res.status(404).json({
      message: 'not implemented',
    })
    
  }


}
