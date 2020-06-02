import React, { FunctionComponent, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { TUser } from '~/types'
import './style.less'
import { format } from 'url'

interface UserScreenProps {
  token: string
  setToken: (token: string) => any
}

export const UserScreen: FunctionComponent<UserScreenProps> = ({ token, setToken }) => {
  const [user, setUser] = useState<TUser>()
  const [userNotFound, setUserNotFound] = useState('')
  const { usernameOrId } = useParams()

  useEffect(() => {
    fetch(`http://localhost:8080/users/${usernameOrId}`, {
      headers: {
        'auth-token': token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        res.message ? setUserNotFound(res.message) : null
        setUser(res.user)
      })
      .catch((error) => console.log(error))
  }, [])

  if (userNotFound) return <div>User Not Found</div>
  if (!user) return <div>Loading...</div>

  return (
    <main id="user-screen">
      <h1>User page</h1>
      <div className="user_title">email: {user.email}</div>
      <div className="user_description">username: {user.username}</div>
    </main>
  )
}
