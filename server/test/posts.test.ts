import request from 'supertest'
import casual from 'casual'
import { createDatabase } from '~/database'
import { TPost } from '~/types'
import jwt from 'jsonwebtoken'

// drop database and start server before each test run
beforeAll(async () => {
  const database = await createDatabase()
  await database.dropDatabase()
})

let token = ''

let context = {
  posts: Array.from({ length: 10 }).map(
    () =>
      ({
        title: casual.title,
        description: casual.description,
      } as TPost),
  ),

  updatedPost: {
    title: 'updated test title',
    description: 'updated test description',
  } as TPost,
}

describe('posts', () => {
  // create post, update context ids
  describe('register', () => {
    it('rejects empty credentials', async () => {
      await request('http://localhost:8080')
        .post('/auth/register')
        .send({
          email: '',
          username: '',
          password: '',
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toEqual('bad credentials')
        })
    })

    it('creates user', async () => {
      await request('http://localhost:8080')
        .post('/auth/register')
        .send({
          email: 'tester2@example.com',
          username: 'tester2',
          password: 'super-secret-password',
        })
        .expect(200)
        .expect((res) => {
          expect(jwt.decode(res.body.token)).toHaveProperty('_id')
          token = res.body.token
        })
    })
  })

  it('create post', async () => {
    for (const item of context.posts) {
      await request('http://localhost:8080')
        .post('/posts')
        .set('auth-token', token)
        .send(item)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('postID')

          context.posts[0]._id = res.body.postID
          context.updatedPost._id = res.body.postID
        })
    }
  })
})

// update post
it('update post', async () => {
  await request('http://localhost:8080')
    .patch(`/posts/${context.posts[0]._id}`)
    .set('auth-token', token)
    .send(context.updatedPost)
    .expect(200)
})

// get post, check if updated
it('get post', async () => {
  await request('http://localhost:8080')
    .get(`/posts/${context.posts[0]._id}`)
    .set('auth-token', token)
    .expect(200)
    .expect((res) => {
      expect(context.posts[0]._id).toEqual(res.body.post._id)
      expect(context.posts).not.toMatchObject(res.body.post)
    })
})

// list posts, check if contains updated post
it('list posts', async () => {
  await request('http://localhost:8080')
    .get('/posts/')
    .set('auth-token', token)
    .expect(200)
    .expect((res) => {
      expect(res.body.posts[res.body.posts.length - 1]).toMatchObject(context.updatedPost)
    })
})

it('pagination', async () => {
  const limit = 1
  const skip = 2
  await request('http://localhost:8080')
    .get(`/posts?skip=${skip}&limit=${limit}`)
    .set('auth-token', token)
    .expect(200)
    .expect((res) => {
      expect(res.body.posts).toHaveLength(limit)
      expect(res.body.posts.find((post) => post._id == context.posts[0]._id)).toBeFalsy()
      expect(res.body.posts.find((post) => post._id == context.posts[1]._id)).toBeFalsy()
    })
})

// delete post
it('delete post', async () => {
  await request('http://localhost:8080')
    .delete(`/posts/${context.posts[0]._id}`)
    .set('auth-token', token)
    .expect(200)

  // should return 404, post was deleted
  await request('http://localhost:8080')
    .get(`/posts/${context.posts[0]._id}`)
    .set('auth-token', token)
    .expect(404)

  // should not contain post
  await request('http://localhost:8080')
    .get('/posts/')
    .set('auth-token', token)
    .expect(200)
    .expect((res) => {
      expect(res.body.posts).toHaveLength(context.posts.length - 1)
    })
})
