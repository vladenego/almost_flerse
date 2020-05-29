import React, { FunctionComponent, useState } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { AuthScreen, FeedScreen } from '~/screens'
import { Header } from '~/components'

export const App: FunctionComponent = () => {
  const [token, setToken] = useState(localStorage.getItem('token'))

  return (
    <BrowserRouter>
      <Header token={token} setToken={setToken} />

      {/* enable different screens depending on authentication state */}
      {token ? (
        <Switch>
          <Route path="/feed">
            <FeedScreen setToken={setToken} token={token} />
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
