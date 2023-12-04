import React from 'react'
import Chats from './Chats';
import  Navbar  from './Navbar';
import Search from './Search';

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
  )
}

export default Sidebar;