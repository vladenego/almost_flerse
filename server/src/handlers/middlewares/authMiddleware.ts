import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { Token } from '~/types'

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('auth-token')

  if (!token || token === null) {
    return res.status(401).send('Access denied')
  }

  try {
    req.user = jwt.verify(token, '1234') as Token

    next()
  } catch (error) {
    console.log(error)
    res.status(400).send('Invalid token')
  }
}
