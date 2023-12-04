import React from 'react';
import Navbar from './Navbar';
import Search from './Search';
import Chats from './Chats';

export const Sidebar = ({ selectedUser }) => {
  if (selectedUser) {
    return null; // Hide the sidebar if a user is selected
  }

  return (
    <div className="sidebar">
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
};

export default Sidebar;

