import React, { useState, useEffect } from 'react';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';

const OnlineIndicator = ({ userId }) => {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const db = getFirestore();
    const userRef = doc(db, 'users', userId);

    const unsubscribe = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        const { lastSeen } = doc.data();
        const now = Date.now();

        if (now - lastSeen.toMillis() < 300000) {
          setIsOnline(true);
        } else {
          setIsOnline(false);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [userId]);

  return (
    <span className={`online-indicator ${isOnline ? 'online' : 'offline'}`}>
      {isOnline ? 'Online' : 'Offline'}
    </span>
  );
};

export default OnlineIndicator;
