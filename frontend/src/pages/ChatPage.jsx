import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

const ChatPage = () => {
    const {authUser,isLoggedIn,login,logout}=useAuthStore()
    
  return (
    <div className='z-10'>ChatPage

    <button onClick={logout}>logout</button>
    </div>
  )
}

export default ChatPage