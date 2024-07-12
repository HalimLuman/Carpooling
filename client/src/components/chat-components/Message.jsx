import React from "react";
import { registration } from "../../assets";
import useConversation from "../../zustand/useConversation";
import { useSelector } from 'react-redux'
const Message = ({ message }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const {selectedConversation} = useConversation();
  const isSender = message.senderId === userInfo._id;
  const date = new Date(message.createdAt);
  const formattedDate = `${date.getHours()}:${date.getMinutes()}`;
  return (
    <div className={`flex ${isSender ? 'justify-start flex-row-reverse' : 'justify-start'} mb-4`}>
        <div className="flex-shrink-0">
          <img src={isSender ? userInfo.profilePic : selectedConversation.profilePic} alt="Profile" className={`h-10 w-10 rounded-full object-cover ${isSender ? 'mr-3' : 'ml-3' }`} />
        </div>
      <div className={`max-w-[300px] justify-start break-words px-3 rounded-lg  `}>
        <div className={`${isSender ? "bg-sky-600" : "dark:bg-n-1/80 bg-n-8/10"} text-n-8 px-3 py-2 rounded-lg`}>{message.message}</div>
        <div className={`text-xs flex items-center ${isSender ? 'justify-end' : 'justify-start'} text-neutral-400 mt-1 tracking-wider w-full`}>
          {formattedDate}
        </div>
      </div>
    </div>
  );
};

export default Message;
