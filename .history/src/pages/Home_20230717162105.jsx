import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Input from '../components/Input'
import ChatContainer from '../components/ChatContainer'

const Home = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className='home'>
      <div className="container">
        <Sidebar />
        <div className="chat">
          <div className="messages" style={{ backgroundColor: "#ddddf7", padding: "10px", height: "calc(100% - 160px)", overflow: "scroll" }}>
            {selectedUser ? (
              <ChatContainer selectedUser={selectedUser} />
            ) : (
              <div className="main">Главная страница <br />Вы вряд ли что-то интересное здесь увидите</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
