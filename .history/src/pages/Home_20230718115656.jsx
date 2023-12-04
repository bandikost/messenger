import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import styles from "../components/modules/Link.module.css";

const Home = () => {
  const history = useNavigate();
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

  const handleSwipeLeft = () => {
    // Add your logic to handle swipe left (e.g., navigate to the main page)
    history.push('/main');
  };

  return (
    <div className={styles.appContainer}>
      <div className='home'>
        <div className="container" onTouchEnd={handleSwipeLeft}>
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
                  <div className="main">
                    Главная страница
                    <br />
                    Вы вряд ли что-то интересное здесь увидите
                  </div>
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
