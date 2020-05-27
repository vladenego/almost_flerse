import React, { FunctionComponent, useState } from 'react'
import './styles.less'

interface AuthScreenProps {
  setAuthenticated: (authenticated: boolean) => any
}

export const AuthScreen: FunctionComponent<AuthScreenProps> = ({ setAuthenticated }) => {
  const [email, setEmail] = useState<String>('')
  const [password, setPassword] = useState<String>('')
  const [loginError, setLoginError] = useState<String>('')

  const loginHandler = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault()

    fetch('http://localhost:8080/auth/login/', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) setLoginError(res.message)
        // res.details[0].message != 'undefined' ? setLoginError(res.details[0].message) : {}

        if (res.token != '' && res.token != undefined) {
          localStorage.setItem('token', res.token)
          setAuthenticated(true)
        }
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error)
      })
  }

  const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  return (
    <main id="auth-screen">
      <h3 className="title">AUTH</h3>
      <p className="errorMessage">{loginError ? loginError : ''}</p>
      <form onSubmit={(event) => loginHandler(event)}>
        <label htmlFor="name">Email</label>
        <br />
        <input type="email" name="email" onChange={(event) => emailHandler(event)} />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          type="password"
          name="password"
          onChange={(event) => passwordHandler(event)}
        />
        <br />
        <input type="submit" className="submit" value="LOG IN" />
      </form>
    </main>
  )
}
