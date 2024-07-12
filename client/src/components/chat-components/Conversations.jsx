import Conversation from './Conversation';
import '../../css/form.css';
import useGetConversations from '../../hooks/useGetConversations';

const Conversations = ({ toggleSidebar }) => {
  const { conversations, loading } = useGetConversations();

  return (
    <div className="pt-5 flex flex-col space-y-3 overflow-y-auto w-full custom-scrollbar">
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        conversations.map((conversation) => (
          <Conversation key={conversation._id} conversation={conversation} toggleSidebar={toggleSidebar} />
        ))
      )}
    </div>
  );
};

export default Conversations;
