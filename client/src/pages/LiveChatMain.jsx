import { useEffect, useState } from "react";
import ChatSidebar from "../components/chat-components/ChatSidebar";
import MessageContainer from "../components/chat-components/MessageContainer";
import NavbarLive from '../components/NavbarLive';
import '../css/form.css';

const LiveChatMain = () => {
  // State for dark mode, default to true if no saved value
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  });

  // State to show or hide sidebar
  const [showSidebar, setShowSidebar] = useState(true);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setShowSidebar(prevShowSidebar => !prevShowSidebar);
  };

  // Handle dark mode and save preference to localStorage
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="flex flex-col h-screen w-full dark:bg-neutral-950">
      <NavbarLive />
      <div className="flex h-full overflow-hidden dark:bg-neutral-950">
        <ChatSidebar toggleSidebar={toggleSidebar} showSidebar={showSidebar} />
        <MessageContainer showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
      </div>
    </div>
  );
};

export default LiveChatMain;
