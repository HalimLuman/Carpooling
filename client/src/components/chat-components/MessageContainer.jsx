import React, { useEffect } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import useConversation from '../../zustand/useConversation'
import { CiCircleRemove } from "react-icons/ci";

const MessageContainer = ({showSidebar, toggleSidebar}) => {
    const {selectedConversation, setSelectedConversation} = useConversation();
    useEffect(() => {

      return () => {
        setSelectedConversation(null);
      }
    },[setSelectedConversation])
  return (
    <div className={`${showSidebar ? 'hidden lg:flex lg:flex-col' : 'flex flex-col w-full lg:w-[78%]'} w-full lg:w-[78%] flex flex-col`}>
        {!selectedConversation ? ( 
          <NoChatSelected /> 
        ) : (
          <>
            <header className='shadow dark:shadow-white/20 dark:bg-neutral-900 px-6 py-3 flex items-center justify-between'>
                <div>
                    <span className='dark:text-gray-200 text-n-8'>To:</span>{" "}
                    <span className='dark:text-white text-n-8 font-bold'>{selectedConversation.name}{" "}{selectedConversation.surname}</span>
                </div>
                <CiCircleRemove onClick={toggleSidebar} size={30} className='lg:hidden text-n-8 dark:text-n-1'/>
            </header>
            <div className='flex flex-col flex-1 overflow-hidden h-screen'>
              <Messages />
              <MessageInput />
            </div>
          </>
        )}
    </div>
  )
}

export default MessageContainer

const NoChatSelected = () => {
  return (
    <div className='flex items-center justify-center w-full h-screen'>
      <div className='px-6 py-4 text-center text-lg md:text-xl text-gray-700 dark:text-gray-200 font-semibold flex flex-col items-center gap-3'>
        <p>Welcome 👋 Halim ❄</p>
        <p>Select a chat to start messaging</p>
      </div>
    </div>
  );
};
