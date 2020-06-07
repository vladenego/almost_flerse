import React, { FunctionComponent, useState } from 'react'
import { authRequest } from './api'

import './styles.less'

interface AuthScreenProps {
  setToken: (token: string) => any
}

export const AuthScreen: FunctionComponent<AuthScreenProps> = ({ setToken }) => {
  const [login, setLogin] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [mode, setMode] = useState<'login' | 'register'>('login')

  const loginHandler = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault()

    authRequest(mode, email, login, password)
      .then(async (res) => {
        if (res.ok) {
          return await res.json()
        }

        throw await res.json()
      })
      .then((res) => {
        setToken(res.token)
      })
      .catch((error) => {
        setError(error.message)

        console.error('failed to log in', error)
      })
  }
  return (
    <main id="auth-screen">
      <h3 className="title">{mode === 'login' ? 'Log in' : 'Register'}</h3>
      <p className="errorMessage">{error ? error : ''}</p>
      <form onSubmit={(event) => loginHandler(event)}>
        {mode === 'register' ? (
          <div>
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              name="email"
              onChange={(event) => setEmail(event.target.value)}
            />
            <br />
          </div>
        ) : null}
        <label htmlFor="username">Username</label>
        <br />
        <input
          type="login"
          name="login"
          onChange={(event) => setLogin(event.target.value)}
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          type="password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <p>
          {mode === 'login' ? "Don't have an account? " : 'Have an account? '}
          <a
            id="have_account"
            onClick={
              mode === 'login' ? () => setMode('register') : () => setMode('login')
            }
          >
            {mode === 'login' ? 'Register' : ' Log in'}
          </a>
        </p>
        <input
          type="submit"
          className="submit"
          value={mode === 'login' ? 'Log in' : 'Register'}
        />
      </form>
    </main>
  )
}
