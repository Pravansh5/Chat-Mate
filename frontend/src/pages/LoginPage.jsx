import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

const LoginPage = () => {
      const {authUser,isloggedIn,login}=useAuthStore()
    
  return (
    <div>LoginPage</div>
  )
}

export default LoginPage