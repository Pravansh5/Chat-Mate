import React from 'react'
import { useAuthStore}  from '../store/useAuthStore'
import ChatContainer from '../components/ChatContainer'
import  NoConversationPlaceholder  from '../components/NoConversationPlaceholder'
import BorderAnimatedContainer from '../components/BorderAnimatedContainer'
import ProfileHeader from '../components/ProfileHeader'
import ActiveTabSwitch from '../components/ActiveTabSwitch'
import ChatsList from '../components/ChatsList'
import ContactList from '../components/ContactList'

const ChatPage = () => {
    const {authUser,isLoggedIn,login,logout,selectedUser,activeTab}=useAuthStore()
    
  return (
    <div className='relative w-full max-w-6xl h-[800px]'>
      <BorderAnimatedContainer>
        {/* Left Side */}
        <div className='w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col'>
        <ProfileHeader>
          <ActiveTabSwitch>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {activeTab==="chats"?<ChatsList/>: <ContactList/>}
            </div>
          </ActiveTabSwitch>
        </ProfileHeader>

        </div>

        {/* Right Side */}
        <div className='flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm'>
        {selectedUser? <ChatContainer />:<NoConversationPlaceholder />}

        </div>
      </BorderAnimatedContainer>
    </div>
  )
}

export default ChatPage