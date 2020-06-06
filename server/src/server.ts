import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'

import { createDatabase } from './database'
import { authMiddleware } from './middlewares'
import {
  loginHandler,
  registerHandler,
  createPostHandler,
  listPostsHandler,
  getPostHandler,
  updatePostHandler,
  deletePostHandler,
  getUserHandler,
} from './handlers'

/** creates a new express server */
export const createServer = async () => {
  // create express application
  const server = express()

  // connect to database
  console.log('connecting to database')
  const database = await createDatabase()

  // set up middlewares
  console.log('setting up middlewares')
  server.use(cors())
  server.use(morgan('tiny'))
  server.use(bodyParser.json({ limit: '4mb' }))

  // set up routes
  console.log('setting up routes')
  // auth
  server.post('/auth/login', loginHandler(database))
  server.post('/auth/register', registerHandler(database))
  // posts
  server.post('/posts', authMiddleware, createPostHandler(database))
  server.get('/posts', authMiddleware, listPostsHandler(database))
  server.get('/posts/:postId', getPostHandler(database))
  server.patch('/posts/:postId', authMiddleware, updatePostHandler(database))
  server.delete('/posts/:postId', authMiddleware, deletePostHandler(database))

  //users
  server.get('/users/:usernameOrId', authMiddleware, getUserHandler(database))

  return server
}
