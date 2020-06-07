export type TRegisterCredentials = {
  email: string
  username: string
  password: string
}

export type TLoginCredentials = {
  login: string
  password: string
}

export type TPost = {
  _id?: string
  title?: string
  description?: string
  userId?: string
  date?: number
}

export type Token = {
  _id: string
  iat: number
}

export type TUser = {
  _id: string
  email: string
  username: string
}

// extend express req
declare global {
  namespace Express {
    interface Request {
      user: Token
    }
  }
}
