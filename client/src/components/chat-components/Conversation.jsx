import { useSocketContext } from '../../context/SocketContext.jsx';
import useConversation from '../../zustand/useConversation.js';

const Conversation = ({ conversation, toggleSidebar }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  const handleSelect = () => {
    setSelectedConversation(conversation);
    toggleSidebar();
  };

  return (
    <>
      <div
        onClick={handleSelect}
        className={`relative flex gap-2 items-center rounded-lg p-3 cursor-pointer ${isSelected ? 'bg-neutral-100/90 hover:bg-neutral-100/80 ' : 'hover:bg-sky-600/20'}`}
      >
        <div className="relative flex-shrink-0">
          <img
            src={conversation.profilePic}
            alt={`${conversation.name} ${conversation.surname}`}
            width={40}
            height={40}
            className="rounded-full"
          />
          {isOnline && (
            <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          )}
        </div>
        <div className="flex flex-col flex-grow">
          <div className="flex justify-between items-center">
            <p className={`font-bold ${isSelected ? 'text-neutral-900 dark:text-neutral-800 ' : 'text-neutral-800 dark:text-neutral-200'}`}>
              {conversation.name} {conversation.surname}
            </p>
          </div>
        </div>
      <div className={`${isSelected ? "text-n-8  text-sm" : "text-n-8 dark:text-n-1 text-sm"}`}>{isOnline ? "Active Now" : ""}</div>
      </div>
      <hr className="w-full border-t border-gray-200 dark:border-gray-700" />
    </>
  );
};

export default Conversation;
