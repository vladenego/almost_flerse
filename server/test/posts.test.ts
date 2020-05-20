import request from 'supertest'
import { createDatabase } from '../src/database'

// drop database and start server before each test run
beforeAll(async () => {
  const database = await createDatabase()
  await database.dropDatabase()
})

describe('CRUD Posts', () => {
  describe('create post and receive its ID', () => {
    it('send post to DB', async () => {
      await request('http://localhost:8080')
        .post('/posts')
        .send({
          title: 'test title',
          description: 'test description',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('postID')
        })
    })
  })

  describe('CRUD posts', () => {
    it('rejects empty credentials', async () => {
      await request('http://localhost:8080')
        .post('/posts/:postId')
        .send({
          // _id: req.params.postId,
          email: '',
          password: '',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('_id')
        })
    })

  //   it('logs in user and returns token', async () => {
  //     await request('http://localhost:8080')
  //       .post('/auth/login')
  //       .send({
  //         email: 'tester@example.com',
  //         password: 'super-secret-password',
  //       })
  //       .expect(200)
  //       .expect((res) => {
  //         expect(jwt.decode(res.body.token)).toHaveProperty('_id')
  //       })
  //   })
  // })
})
