import React, { FunctionComponent, useState } from 'react'

import './styles.less'

interface AuthScreenProps {
  setToken: (token: string) => any
}

export const AuthScreen: FunctionComponent<AuthScreenProps> = ({ setToken }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [mode, setMode] = useState<'login' | 'register'>('login')

  const loginHandler = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault()

    fetch(`http://localhost:8080/auth/${mode}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(async (res) => {
        if (res.ok) {
          return await res.json()
        }

        throw await res.json()
      })
      .then((res) => {
        setToken(res.token)

        localStorage.setItem('token', res.token)
      })
      .catch((error) => {
        setLoginError(error.message)

        console.error('failed to log in', error)
      })
  }
  return (
    <main id="auth-screen">
      <h3 className="title">{mode === 'login' ? 'Log in' : 'Register'}</h3>
      <p className="errorMessage">{loginError ? loginError : ''}</p>
      <form onSubmit={(event) => loginHandler(event)}>
        <label htmlFor="name">Email</label>
        <br />
        <input
          type="email"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
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
