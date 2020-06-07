import { Request, Response } from 'express'
import { Db, ObjectId } from 'mongodb'

/** finds and returns a user by id */
export const getUserHandler = (database: Db) => async (req: Request, res: Response) => {
  const { usernameOrId } = req.params

  try {
    const user = await database.collection('users').findOne({
      $or: [
        {
          username: usernameOrId,
        },
        { _id: ObjectId.isValid(usernameOrId) ? new ObjectId(usernameOrId) : null },
      ],
    })

    // send 404 if user was not found
    if (!user) {
      return res.status(404).json({
        message: 'failed to find userx',
      })
    }

    delete user['password']
    if (req.user._id != user._id) {
      delete user['email']
    }

    return res.status(200).json({ user })
  } catch (error) {
    console.error('failed to get user', error)

    return res.status(500).send({})
  }
}
