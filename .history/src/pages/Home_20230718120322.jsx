import React, { useEffect, useState } from 'react';
import { useNavigate, useNavigate } from 'react-router-dom';
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
      history.push('/main');
    }
  }, [isSwipeDetected, navigate]);

  return (
    <div className={styles.appContainer} onTouchEnd={handleSwipeLeft}>
      <div className='home'>
        <div className="container">
          <Sidebar />
          {/* Rest of the component */}
        </div>
      </div>
    </div>
  );
};

export default Home;
