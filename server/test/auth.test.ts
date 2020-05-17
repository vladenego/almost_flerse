import request from 'supertest'
import { createDatabase } from '../src/database'

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

  // // TODO
  // describe('login', () => {
  //   it('rejects empty credentials', async () => {
  //     // TODO
  //   })

  //   it('logs in user and returns token', async () => {
  //     // TODO
  //   })
  // })
})
