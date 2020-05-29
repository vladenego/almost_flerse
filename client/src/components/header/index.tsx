import React, { FunctionComponent } from 'react'
import './styles.less'

interface HeaderProps {
  token: string
  setToken: (token: string) => any
}

export const Header: FunctionComponent<HeaderProps> = ({ token, setToken }) => {
  const signOutHandler = () => {
    setToken('')
    localStorage.removeItem('token')
  }
  return (
    <div id="header">
      <div className="title">FLERSE</div>

      {token && (
        <div className="sign-out" onClick={() => signOutHandler()}>
          SIGN OUT
        </div>
      )}
    </div>
  )
}
