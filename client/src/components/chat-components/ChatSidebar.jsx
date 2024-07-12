import SearchInput from './SearchInput';
import Conversations from './Conversations';

const ChatSidebar = ({ showSidebar, toggleSidebar }) => {
  return (
    <div className={`${showSidebar ? 'flex flex-col' : 'hidden'} lg:flex lg:flex-col w-full lg:w-[22%] p-3 pb-0 dark:bg-neutral-950 shadow dark:shadow-white/20 z-2`}>
      <SearchInput toggleSidebar={toggleSidebar} />
      <Conversations toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default ChatSidebar;
