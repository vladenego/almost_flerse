import { Request, Response } from 'express'
import { Db } from 'mongodb'

/** logs in user by email and password, returns auth token */
export const loginHandler = (database: Db) => async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    // validate email and password
    console.log('validate credentials')
    if (!email.trim() || !password.trim()) {
      console.log('invalid credentials')

      return res.status(400).json({
        message: 'invalid credentials',
      })
    }

    // find user in db
    console.log('finding user in db')
    const user = await database.collection('users').findOne({ email })

    // TODO: compare provided password with hashed one
    console.log('comparing passwords')
    if (user.password !== password) {
      console.log("password doesn't match")

      return res.status(400).json({
        message: "password doesn't match",
      })
    }

    // TODO: sign token
    console.log('signing token')
    const token = ''

    // send response
    console.log('sending response')
    return res.status(200).json({
      token,
    })
  } catch (error) {
    console.error('failed to log in user', error)

    return res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    })
  }
}
