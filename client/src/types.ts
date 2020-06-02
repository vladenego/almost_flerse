import { type } from 'os'

export type TPost = {
  _id: number
  title: string
  description: string
  date: number
  userId: string
}

export type TUser = {
  _id: string
  email: string
  username: string
}
