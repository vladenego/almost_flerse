import { Db } from 'mongodb'
import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import Joi from '@hapi/joi'
import jwt from 'jsonwebtoken'
import { TRegisterCredentials } from '~/types'
import { authSchema } from '~/schemas'

/** registers user by email and password */
export const registerHandler = (database: Db) => async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body as TRegisterCredentials

    console.log('validating credentials')
    const { error } = authSchema.validate(
      { email: email, password: password, username: username },
      { abortEarly: false },
    )
    if (error) {
      console.log('validation failed', error.details)

      return res.status(400).json({
        message: 'bad credentials',
        details: error.details,
      })
    }

    console.log('checking if user already exists')
    const emailExists = await database.collection('users').countDocuments({ email })
    if (emailExists != 0) {
      console.log('user with such email already exist')

      return res.status(400).json({
        message: 'user with such email already exist',
      })
    }

    const usernameExists = await database.collection('users').countDocuments({ username })
    if (usernameExists != 0) {
      console.log('user with such username already exists')

      return res.status(400).json({
        message: 'user with such username already exists',
      })
    }

    console.log('hashing password')
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    console.log('saving user to database')
    const { insertedId } = await database.collection('users').insertOne({
      email,
      username,
      password: passwordHash,
    })

    console.log('signing token')
    const token = jwt.sign({ _id: insertedId }, '1234')

    console.log('sending response')
    return res.status(200).json({ token })
  } catch (error) {
    console.error('failed to register user', error)

    return res.status(500).json({})
  }
}
