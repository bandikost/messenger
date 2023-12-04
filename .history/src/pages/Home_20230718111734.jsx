import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

const Home = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedChatId, setSelectedChatId] = useState(null);
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
    <div className={styles.container}>
      <div className='home'>
        <div className="container">
          <Sidebar selectedUser={selectedUser} selectedChatId={selectedChatId} />
          {isMobile ? (
            <div className="chats">
            <></>
            </div>
          ) : (
            <div className="chat-main">
              <></>
              <div className="messages-main">
                {selectedUser ? (
                <></>
                ) : (
                  <div className="main">Главная страница<br />Вы вряд ли что-то интересное здесь увидите</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
