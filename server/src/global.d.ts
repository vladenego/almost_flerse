export {}

import { Token } from './types'

declare global {
  namespace Express {
    interface Request {
      user: Token
    }
  }
}
