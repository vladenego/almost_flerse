import request from 'supertest'
import { createDatabase } from '../src/database'

// drop database and start server before each test run
beforeAll(async () => {
  const database = await createDatabase()
  await database.dropDatabase()
})

let postId = ''

describe('Posts', () => {
  it('Create post', async () => {
    await request('http://localhost:8080')
      .post('/posts')
      .send({
        title: 'test title',
        description: 'test description',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('postID')
        postId = res.body.postID
        console.log(postId)
      })
  })

  it('Update post', async () => {
    const postBeforeUpdate = await request('http://localhost:8080')
      .get(`/posts/${postId}`)
      .expect(200)

    await request('http://localhost:8080')
      .patch(`/posts/${postId}`)
      .send({
        title: 'Updated title',
        description: 'Updated description',
        date: Date.now(),
      })
      .expect(200)

    const postAfterUpdate = await request('http://localhost:8080')
      .get(`/posts/${postId}`)
      .expect(200)
    expect(postBeforeUpdate).not.toMatchObject(postAfterUpdate)
  })

  it('Delete post', async () => {
    await request('http://localhost:8080').delete(`/posts/${postId}`).expect(200)
    await request('http://localhost:8080')
      .get('/posts/')
      .expect(200)
      .expect((res) => {
        expect(res.body.posts.find((element) => element._id == postId)).toBeFalsy()
      })
  })
})

// describe('CRUD posts', () => {
//   it('rejects empty credentials', async () => {
//     await request('http://localhost:8080')
//       .post('/posts/:postId')
//       .send({
//         // _id: req.params.postId,
//         email: '',
//         password: '',
//       })
//       .expect(200)
//       .expect((res) => {
//         expect(res.body).toHaveProperty('_id')
//       })
//   })

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
