import React from 'react'
import { io } from 'socket.io-client'

const PlayPage = () => {
  const socket = io('ws://localhost:8000');
  
  return (
    <div className="pt-16">
      <div className="min-h-[200vh]">
        Play
      </div>
    </div>
  )
}

export default PlayPage