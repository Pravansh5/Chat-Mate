import React from 'react'
import ChatPage from './pages/ChatPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import PageLoader from './components/PageLoader'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const {checkAuth,isCheckingAuth,authUser}=useAuthStore()
  useEffect(()=>{
    checkAuth()
  },[checkAuth]);
  // console.log(authUser)

  if(isCheckingAuth) return <PageLoader/>
  return (
      <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
      {/* DECORATORS - GRID BG & GLOW SHAPES */}
     <div className="absolute inset-0 
    bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_2px),
        linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_3px)]
    bg-[size:14px_24px]" 
/>

{/* Top-left glow */}
<div className="absolute top-0 -left-4 w-96 h-96 bg-[#4fc3f7] opacity-20 blur-[100px]" />

{/* Bottom-right glow */}
<div className="absolute bottom-0 -right-4 w-96 h-96 bg-white opacity-20 blur-[100px]" />

    {/* <button onClick={login} className='z-10'>Login</button> */}
    <Routes>
      <Route path="/" element={authUser?<ChatPage/>:<Navigate to={"/login"}/>} />
      <Route path="/login" element={!authUser?<LoginPage/>:<Navigate to={"/"}/>}/>
      <Route path="/signup" element={!authUser?<SignUpPage/>:<Navigate to={"/"}/>}/>

      <Route/>

    
    </Routes>
    <Toaster/>
    </div>
  )
}

export default App