import React, { FunctionComponent, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import { Post } from '~/components/post/index'
import { getPosts } from './api'
import './style.less'

interface FeedScreenProps {
  token: string
  setToken: (token: string) => any
}

export const FeedScreen: FunctionComponent<FeedScreenProps> = ({ token, setToken }) => {
  const [postsAndUsers, setPostsAndUsers] = useState({
    posts: [],
    users: [],
  })

  const [tag, setTag] = useState(() => queryString.parse(window.location.search).tag)

  useEffect(() => {
    getPosts(token, tag)
      .then((res) => res.json())
      .then((res) => {
        setPostsAndUsers({ posts: res.posts, users: res.users })
      })
      .catch((error) => console.log(error))
  }, [tag])

  return (
    <main id="feed-screen">
      <Link
        to="/feed/"
        onClick={() => {
          setTag('')
        }}
      >
        <h3>FEED</h3>
      </Link>

      <div>
        <ul className="post-category">
          <li>
            <Link
              to="/feed?tag=tech"
              onClick={() => {
                setTag('tech')
              }}
            >
              Technology
            </Link>
          </li>
          <li>
            <Link
              to="/feed?tag=psychology"
              onClick={() => {
                setTag('psychology')
              }}
            >
              Psychology
            </Link>
          </li>
          <li>
            <Link
              to="/feed?tag=sport"
              onClick={() => {
                setTag('sport')
              }}
            >
              Sport
            </Link>
          </li>
          <li>
            <Link
              to="/feed?tag=js"
              onClick={() => {
                setTag('js')
              }}
            >
              Js
            </Link>
          </li>
        </ul>
      </div>

      {postsAndUsers.posts.length != 0 || postsAndUsers.users.length != 0 ? (
        <div className="postList">
          {postsAndUsers.posts.map((post) => (
            <Post
              post={post}
              user={postsAndUsers.users.find((user) => user._id === post.userId)}
              key={post._id}
            />
          ))}
        </div>
      ) : (
        <div className="posts-absent">no such posts...</div>
      )}
    </main>
  )
}
