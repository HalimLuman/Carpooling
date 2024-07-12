import React, { useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa'
import useSendMessage from '../../hooks/useSendMessage';

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const {loading, sendMessage} = useSendMessage()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!message) return;
    await sendMessage(message);
    setMessage("");
  }
  return (
    <form onSubmit={handleSubmit} className='flex items-center px-4 py-3 dark:bg-neutral-900 border-t dark:border-neutral-700'>
      <input 
        type='text' 
        className='border text-sm text-n-8 dark:text-n-1 rounded-lg block w-full p-2.5 bg-n-1 dark:bg-neutral-700 dark:border-neutral-600 border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500' 
        placeholder='Send a message' 
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type='submit' className='ml-2 p-2.5 rounded-lg bg-blue-500 text-white hover:bg-blue-600'>
        <FaPaperPlane />
      </button>
    </form>
  )
}

export default MessageInput
