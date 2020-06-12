import React, { FunctionComponent, useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import jwt from 'jsonwebtoken'
import {
  AuthScreen,
  FeedScreen,
  PostsScreen,
  AddScreen,
  UserScreen,
  UpdatePostScreen,
} from '~/screens'
import { Header } from '~/components'
import { TUser, TToken } from './types'

export const App: FunctionComponent = () => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState<TUser>()

  useEffect(() => {
    localStorage.setItem('token', token)

    if (token) {
      const decodedToken = jwt.decode(token) as TToken

      fetch(`http://localhost:8080/users/${decodedToken._id}`, {
        headers: {
          'auth-token': token,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setUser(res.user)
        })
        .catch(console.error)
    }
  }, [token])

  return (
    <BrowserRouter>
      <Header token={token} user={user} setToken={setToken} />

      {/* enable different screens depending on authentication state */}
      {token ? (
        <Switch>
          <Route exact path="/feed">
            <FeedScreen setToken={setToken} token={token} />
          </Route>

          <Route exact path="/feed/add">
            <AddScreen token={token} />
          </Route>

          <Route path="/feed/update/:postId">
            <UpdatePostScreen setToken={setToken} token={token} />
          </Route>

          <Route path="/feed/:postId">
            <PostsScreen setToken={setToken} token={token} user={user} />
          </Route>

          <Route exact path="/u/:usernameOrId">
            <UserScreen token={token} user={user} />
          </Route>

          {/* redirect to feed by default */}
          <Redirect from="/" to="/feed" />
        </Switch>
      ) : (
        <Switch>
          <Route path="/auth">
            <AuthScreen setToken={setToken} />
          </Route>

          {/* redirect to auth by default */}
          <Redirect from="/" to="/auth" />
        </Switch>
      )}
    </BrowserRouter>
  )
}
