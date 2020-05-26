import request from 'supertest'
import { createDatabase } from '~/database'
import { TPost } from '~/types'

// drop database and start server before each test run
beforeAll(async () => {
  const database = await createDatabase()
  // await database.dropDatabase()
})

let context = {
  post: [
    {
      title: 'test title',
      description: 'test description',
    } as TPost,
    {
      title: 'test title',
      description: 'test description',
    } as TPost,
    {
      title: 'test title',
      description: 'test description',
    } as TPost,
    {
      title: 'test title',
      description: 'test description',
    } as TPost,
    {
      title: 'test title',
      description: 'test description',
    } as TPost,
  ],

  updatedPost: {
    title: 'updated test title',
    description: 'updated test description',
  } as TPost,
}

describe('posts', () => {
  // create post, update context ids
  it('create post', async () => {
    for (const item of context.post) {
      await request('http://localhost:8080')
        .post('/posts')
        .send(item)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('postID')

          context.post[0]._id = res.body.postID
          context.updatedPost._id = res.body.postID
        })
    }
  })
})

// update post
it('update post', async () => {
  await request('http://localhost:8080')
    .patch(`/posts/${context.post[0]._id}`)
    .send(context.updatedPost)
    .expect(200)
})

// get post, check if updated
it('get post', async () => {
  await request('http://localhost:8080')
    .get(`/posts/${context.post[0]._id}`)
    .expect(200)
    .expect((res) => {
      expect(context.post[0]._id).toEqual(res.body.post._id)
      expect(context.post).not.toMatchObject(res.body.post)
    })
})

// list posts, check if contains updated post
it('list posts', async () => {
  await request('http://localhost:8080')
    .get('/posts/')
    .expect(200)
    .expect((res) => {
      console.log(res.body.posts[0])

      expect(res.body.posts[res.body.posts.length - 1]).toMatchObject(context.updatedPost)
    })
})

it('pagination', async () => {
  const limit = 1
  const skip = 2
  await request('http://localhost:8080')
    .get(`/posts?skip=${skip}&limit=${limit}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.posts).toHaveLength(limit)
      expect(res.body.posts.find((post) => post._id == context.post[0]._id)).toBeFalsy()
      expect(res.body.posts.find((post) => post._id == context.post[1]._id)).toBeFalsy()
    })
})

// delete post
it('delete post', async () => {
  await request('http://localhost:8080')
    .delete(`/posts/${context.post[0]._id}`)
    .expect(200)

  // should return 404, post was deleted
  await request('http://localhost:8080').get(`/posts/${context.post[0]._id}`).expect(404)

  // should not contain post
  await request('http://localhost:8080')
    .get('/posts/')
    .expect(200)
    .expect((res) => {
      expect(res.body.posts).toHaveLength(context.post.length - 1)
    })
})
