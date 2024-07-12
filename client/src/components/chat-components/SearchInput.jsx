import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import useConversation from '../../zustand/useConversation.js';
import useGetConversations from '../../hooks/useGetConversations.js';
import { toast } from 'react-toastify';

const SearchInput = ({toggleSidebar}) => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    const conversation = conversations.find((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
      toggleSidebar();
    } else {
      toast.error("No such user found!");
    }
  };

  return (
    <form className="relative flex items-center w-full" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search the firstname..."
        className="w-full px-4 py-2 pr-10 bg-white dark:bg-neutral-800 shadow rounded-full text-n-8 dark:text-n-1"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent focus:outline-none"
      >
        <FaSearch className="text-neutral-400 dark:text-neutral-300" />
      </button>
    </form>
  );
};

export default SearchInput;
