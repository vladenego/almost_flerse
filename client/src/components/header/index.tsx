import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { TUser } from '~/types'
import './styles.less'

interface HeaderProps {
  token: string
  user: TUser
  setToken: (token: string) => any
}

export const Header: FunctionComponent<HeaderProps> = ({ token, user, setToken }) => (
  <div id="header">
    <div className="title">
      <Link to="/">FLERSE</Link>
    </div>

    {user && (
      <nav className="nav">
        <Link className="nav-user" to={`/u/${user._id}`}>
          {user.username}
        </Link>
        <div className="sign-out" onClick={() => setToken('')}>
          SIGN OUT
        </div>
      </nav>
    )}
  </div>
)
