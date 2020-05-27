import React, { FunctionComponent, useState } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { AuthScreen, FeedScreen } from '~/screens'
import { Header } from '~/components'

export const App: FunctionComponent = () => {
  const [authenticated, setAuthenticated] = useState(false)

  return (
    <BrowserRouter>
      <Header authenticated={authenticated} setAuthenticated={setAuthenticated} />

      {/* enable different screens depending on authentication state */}
      {authenticated ? (
        <Switch>
          <Route path="/feed">
            <FeedScreen />
          </Route>

          {/* redirect to feed by default */}
          <Redirect from="/" to="/feed" />
        </Switch>
      ) : (
        <Switch>
          <Route path="/auth">
            <AuthScreen setAuthenticated={setAuthenticated} />
          </Route>

          {/* redirect to auth by default */}
          <Redirect from="/" to="/auth" />
        </Switch>
      )}
    </BrowserRouter>
  )
}
