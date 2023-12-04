import React from 'react'
import Chat from './Chat';
import Message from './Message';
import Sidebar from './Sidebar';

const Dialogs = () => {
  return (
   
<div className='home'>
    <div className="container">
        <Sidebar />
        <Chat />
    </div>

        <Message />
        </div>
 
  )
}

export default Dialogs;