import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Chats from '../components/Chats';
import Chat from '../components/Chat';
import Messages from '../components/Messages';

const Home = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedChatId, setSelectedChatId] = useState(null); // Add selectedChatId state
  const [isMobile, setIsMobile] = useState(false);

  const handleSelectUser = (user, chatId) => {
    setSelectedUser(user);
    setSelectedChatId(chatId);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='home'>
      <div className="container">
        <Sidebar selectedUser={selectedUser} selectedChatId={selectedChatId} /> {/* Pass selectedChatId prop */}
        {isMobile ? (
          <div className="chats">
            <Chats onSelectUser={handleSelectUser} selectedUser={selectedUser} selectedChatId={selectedChatId} /> {/* Pass selectedChatId prop */}
          </div>
        ) : (
          <div className="chat">
            <Chat user={selectedUser} />
            <div className="messages">
              {selectedUser ? (
                <Messages user={selectedUser} />
              ) : (
                <div className="main">Главная страница<br />Вы вряд ли что-то интересное здесь увидите</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
