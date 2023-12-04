import React from 'react'
import Home from '../pages/Home';
import Chat from './Chat';
import Chats from './Chats';
import Input from './Input';
import Message from './Message';
import  Navbar  from './Navbar';
import Search from './Search';
import Sidebar from './Sidebar';

const Dialogs = () => {
  return (
   
<div className='home'>
    <div className="container">
        <Sidebar />
       
    </div>

        <Message />
        </div>
 
  )
}

export default Dialogs;