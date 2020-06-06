import { type } from 'os'

export type TPost = {
  _id: string
  title: string
  description: string
  date: number
  userId: string
  author: string
}

export type TUser = {
  _id: string
  email: string
  username: string
}

export type TToken = {
  _id: string
  iat: number
}
