import React, { FunctionComponent } from 'react'
import './styles.less'

interface AuthScreenProps {
  setAuthenticated: (authenticated: boolean) => any
}

export const AuthScreen: FunctionComponent<AuthScreenProps> = ({ setAuthenticated }) => (
  <main id="auth-screen">
    <h3 className="title">AUTH</h3>

    <button className="submit" onClick={() => setAuthenticated(true)}>
      LOG IN
    </button>
  </main>
)
