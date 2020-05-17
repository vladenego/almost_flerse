import { Db } from 'mongodb'
import { Request, Response } from 'express'

/** registers user by email and password */
export const registerHandler = (database: Db) => async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    // TODO: validate email and password
    console.log('validating credentials')
    if (!email.trim() || !password.trim()) {
      console.log('invalid credentials')

      return res.status(400).json({
        message: 'invalid credentials',
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
    const passwordHash = password

    // save user to db
    console.log('saving user to database')
    await database.collection('users').insertOne({
      email,
      password: passwordHash,
    })

    // send response
    console.log('sending response')
    return res.status(200).json({
      token: '',
    })
  } catch (error) {
    console.error('failed to register user', error)

    return res.status(500).json({
      message: 'Internal Server Error',
    })
  }
}
