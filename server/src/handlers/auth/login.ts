import { Request, Response } from 'express'
import { Db } from 'mongodb'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { TLoginCredentials } from '~/types'
import { authSchema } from '~/schemas'

/** logs in user by email and password, returns auth token */
export const loginHandler = (database: Db) => async (req: Request, res: Response) => {
  const { login, password } = req.body as TLoginCredentials

  try {
    // find user in db
    console.log('finding user in db')
    const user = await database.collection('users').findOne({
      $or: [{ email: login ? login : null }, { username: login ? login : null }],
    })
    if (!user) {
      console.log('there is no such user, try to register first')

      return res.status(400).json({
        message: 'bad credentials',
      })
    }

    // TODO: compare provided password with hashed one
    console.log('comparing passwords')
    const comparePassword = await bcrypt.compare(password, user.password)
    if (!comparePassword) {
      console.log("password doesn't match")

      return res.status(400).json({
        message: "password doesn't match",
      })
    }

    // TODO: sign token
    console.log('signing token')
    const token = jwt.sign({ _id: user._id }, '1234')

    // send response
    console.log('sending response')
    return res.status(200).json({
      token,
    })
  } catch (error) {
    console.error('failed to log in user', error)

    return res.status(500).json({})
  }
}
