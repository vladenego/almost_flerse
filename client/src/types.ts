export type TPost = {
  _id: string
  title: string
  description: string
  date: number
  userId: string
  author: string
  content: string
  tag: string
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
export type TComment = {
  postId: string
  username: string
  comment: string
  userId: string
  date: number
}
