import request from 'supertest'
import { createDatabase } from '~/database'
import jwt from 'jsonwebtoken'
import { Token } from '~/types'

// drop database and start server before each test run
beforeAll(async () => {
  const database = await createDatabase()
  await database.dropDatabase()
})

let username = 'tester3'
let decodedToken: Token
let token = ''

describe('users', () => {
  describe('registers user', () => {
    it('creates user', async () => {
      await request('http://localhost:8080')
        .post('/auth/register')

        .send({
          email: 'tester3@example.com',
          username: 'tester3',
          password: 'super-secret-password',
        })
        .expect(200)
        .expect((res) => {
          token = res.body.token
        })
    })

    it('get user by name', async () => {
      await request('http://localhost:8080')
        .get(`/users/${username}`)
        .set({ 'auth-token': token })
        .expect(200)
        .expect((res) => expect(res.body.user.username).toEqual(username))
    })

    it('get user by  id', async () => {
      decodedToken = jwt.decode(token) as Token

      await request('http://localhost:8080')
        .get(`/users/${decodedToken._id}`)
        .set({ 'auth-token': token })
        .expect(200)
        .expect((res) => {
          expect(res.body.user._id).toEqual(decodedToken._id)
          expect(res.body.user.username).toEqual(username)
        })
    })
  })
})
