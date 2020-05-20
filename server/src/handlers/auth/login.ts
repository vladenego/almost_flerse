import { Request, Response } from 'express'
import { Db } from 'mongodb'
import { log } from 'util'
import bcrypt from 'bcryptjs'
import Joi from '@hapi/joi'
import jwt from 'jsonwebtoken'

/** logs in user by email and password, returns auth token */
export const loginHandler = (database: Db) => async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    // Validation requirements
    const schema = Joi.object({
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(6).required(),
    })

    // Validate email and password
    console.log('validating credentials')
    const { error } = schema.validate(
      { email: email, password: password },
      { abortEarly: false },
    )
    if (error) {
      console.log(error.details)

      return res.status(400).json({
        message: error.details,
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

    return res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    })
  }
}
