import React, { FunctionComponent } from 'react'
import './styles.less'

interface postProps {
  setToken: (token: boolean) => any
}

export const Post: FunctionComponent<postProps> = () => <div className="post"></div>
