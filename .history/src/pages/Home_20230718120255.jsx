import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import styles from "../components/modules/Link.module.css";

const Home = () => {
  const history = useHistory();
  const [isSwipeDetected, setIsSwipeDetected] = useState(false);

  const handleSwipeLeft = () => {
    setIsSwipeDetected(true);
  };

  useEffect(() => {
    if (isSwipeDetected) {
      history.push('/main');
    }
  }, [isSwipeDetected, history]);

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
