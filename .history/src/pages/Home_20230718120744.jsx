import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import styles from "../components/modules/Link.module.css";

const Home = () => {
  const navigate = useNavigate();
  const [isSwipeDetected, setIsSwipeDetected] = useState(false);

  const handleSwipeLeft = () => {
    setIsSwipeDetected(true);
  };

  useEffect(() => {
    if (isSwipeDetected) {
      navigate('/main');
    }
  }, [isSwipeDetected, navigate]);

  return (
    <div className={styles.appContainer} onTouchEnd={handleSwipeLeft}>
      <div className='home'>
        <div className="container">
          <Sidebar />
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
