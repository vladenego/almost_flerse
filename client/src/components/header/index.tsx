import React, { FunctionComponent } from 'react'
import './styles.less'

interface HeaderProps {
  authenticated: boolean
  setAuthenticated: (authenticated: boolean) => any
}

export const Header: FunctionComponent<HeaderProps> = ({
  authenticated,
  setAuthenticated,
}) => (
  <div id="header">
    <div className="title">FLERSE</div>

    {authenticated && (
      <div className="sign-out" onClick={() => setAuthenticated(false)}>
        SIGN OUT
      </div>
    )}
  </div>
)
