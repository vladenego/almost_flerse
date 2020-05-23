import { Request, Response } from 'express'
import { Db } from 'mongodb'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { TCredentials } from '~/types'
import { authSchema } from '~/schemas'

/** logs in user by email and password, returns auth token */
export const loginHandler = (database: Db) => async (req: Request, res: Response) => {
  const { email, password } = req.body as TCredentials

  try {
    // Validate email and password
    console.log('validating credentials')
    const { error } = authSchema.validate(
      { email: email, password: password },
      { abortEarly: false },
    )
    if (error) {
      console.log(error.details)

      return res.status(400).json({
        message: 'bad credentials',
        details: error.details,
      })
    }

    // find user in db
    console.log('finding user in db')
    const user = await database.collection('users').findOne({ email })
    if (!user) {
      console.log('there is no such user, try to register first')

      return res.status(400).json({
        message: 'there is no such user, try to register first',
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
