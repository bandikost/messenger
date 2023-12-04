import React from 'react';
import Navbar from './Navbar';
import Search from './Search';
import Chats from './Chats';

const Sidebar = ({ selectedUser, selectedChatId }) => {
  const isChatOpen = selectedChatId !== null;
  const sidebarClass = isChatOpen ? 'sidebar hidden' : 'sidebar';

  return (
    <div className={sidebarClass}>
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
};

export default Sidebar;

