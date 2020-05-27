import { type } from 'os'

export type TCredentials = {
  email: string
  password: string
}

export type TPost = {
  _id?: string
  title?: string
  description?: string
  date?: number
}

export type Token = {
  _id: string
  iat: number
}
