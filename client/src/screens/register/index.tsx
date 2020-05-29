import React, { FunctionComponent, useState } from 'react'
import { Link } from 'react-router-dom'
import './styles.less'

interface RegisterScreenProps {
  setToken: (token: string) => any
}

export const RegisterScreen: FunctionComponent<RegisterScreenProps> = ({ setToken }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const loginHandler = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault()

    fetch('http://localhost:8080/auth/register/', {
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
      <h3 className="title">REGISTER</h3>
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
          Have account? <Link to="/login">Log in</Link>
        </p>

        <input type="submit" className="submit" value="REGISTER" />
      </form>
    </main>
  )
}
