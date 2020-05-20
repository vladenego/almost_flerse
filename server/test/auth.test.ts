import request from 'supertest'
import { createDatabase } from '../src/database'
const jwt = require('jsonwebtoken')

// drop database and start server before each test run
beforeAll(async () => {
  const database = await createDatabase()
  await database.dropDatabase()
})

describe('auth', () => {
  describe('register', () => {
    it('rejects empty credentials', async () => {
      await request('http://localhost:8080')
        .post('/auth/register')
        .send({
          email: '',
          password: '',
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toEqual('invalid credentials')
        })
    })

    it('creates user', async () => {
      await request('http://localhost:8080')
        .post('/auth/register')
        .send({
          email: 'tester@example.com',
          password: 'super-secret-password',
        })
        .expect(200)
    })
  })

  // TODO
  describe('login', () => {
    it('rejects empty credentials', async () => {
      await request('http://localhost:8080')
        .post('/auth/login')
        .send({
          email: '',
          password: '',
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toEqual('invalid credentials')
        })
    })

    it('logs in user and returns token', async () => {
      await request('http://localhost:8080')
        .post('/auth/login')
        .send({
          email: 'tester@example.com',
          password: 'super-secret-password',
        })
        .expect(200)
        .expect((res) => {
          expect(jwt.decode(res.body.token)).toHaveProperty('_id')
        })
    })
  })
})
