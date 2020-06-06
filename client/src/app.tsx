import React, { FunctionComponent, useState } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import {
  AuthScreen,
  FeedScreen,
  PostsScreen,
  AddScreen,
  UserScreen,
  UpdatePostScreen,
} from '~/screens'
import { Header } from '~/components'

export const App: FunctionComponent = () => {
  const [token, setToken] = useState(localStorage.getItem('token'))

  return (
    <BrowserRouter>
      <Header token={token} setToken={setToken} />

      {/* enable different screens depending on authentication state */}
      {token ? (
        <Switch>
          <Route exact path="/feed">
            <FeedScreen setToken={setToken} token={token} />
          </Route>

          <Route path="/feed/add">
            <AddScreen setToken={setToken} token={token} />
          </Route>

          <Route path="/feed/update/:postId">
            <UpdatePostScreen setToken={setToken} token={token} />
          </Route>

          <Route path="/feed/:postId">
            <PostsScreen setToken={setToken} token={token} />
          </Route>

          <Route exact path="/u/:usernameOrId">
            <UserScreen setToken={setToken} token={token} />
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
