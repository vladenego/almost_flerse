import { Db } from 'mongodb'
import { Request, Response } from 'express'
import { log } from 'util'
import bcrypt from 'bcryptjs'
import Joi from '@hapi/joi'
import jwt from 'jsonwebtoken'

/** registers user by email and password */
export const registerHandler = (database: Db) => async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    // Validation requirements
    const schema = Joi.object({
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(6).required(),
    })

    // VALIADATION
    console.log('validating credentials')
    const { error } = schema.validate(
      { email: email, password: password },
      { abortEarly: false },
    )
    if (error) {
      console.log("validation failed", error.details)

      return res.status(400).json({
        message: error.details,
      })
    }

    // check if user with such email already exists
    console.log('checking if user already exists')
    const userExists = await database.collection('users').countDocuments({ email })
    if (userExists != 0) {
      console.log('user with such email already exists')

      return res.status(400).json({
        message: 'user with such email already exists',
      })
    }

    // TODO: hash password
    console.log('hashing password')
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    // save user to db
    console.log('saving user to database')
    const userId = await database.collection('users').insertOne({
      email,
      password: passwordHash,
    })

    // Assing a token to registered User
    console.log('Assigning a token to User')
    const token = jwt.sign({ _id: userId.insertedId }, '1234')

    // send response
    console.log('sending response')
    return res.status(200).json({
      token: token,
    })
  } catch (error) {
    console.error('failed to register user', error)

    return res.status(500).json({
      message: 'Internal Server Error',
    })
  }
}
