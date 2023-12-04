import React from 'react';
import Navbar from './Navbar';
import Search from './Search';
import Chats from './Chats';

export const Sidebar = ({ selectedUser }) => {
  const sidebarClass = selectedUser ? 'sidebar hidden' : 'sidebar';

  return (
    <div className={sidebarClass}>
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
};

export default Sidebar;
