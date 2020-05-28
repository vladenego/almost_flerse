import React, { FunctionComponent, useState } from 'react'

interface FeedScreenProps {
  setToken: (token: boolean) => any
}

export const FeedScreen: FunctionComponent<FeedScreenProps> = () => {
  return (
    <main id="feed-screen">
      <h3>FEED</h3>
    </main>
  )
}
