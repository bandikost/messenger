import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import search from "../images/chatIcons/search.png";


const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(null);
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
  
    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setErr({ message: "User not found" });
        setUser(null);
      } else {
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
        setErr(null);
      }
    } catch (err) {
      console.log(err);
      setErr({ message: "Error searching for user" });
      setUser(null);
    }
  };
  

  const handleKey = (e) => {
    if (e.code === "Enter" && username ) {
      handleSearch();
      if (!username) {
        setErr("Введите имя пользователя");
      } else {
        handleSearch(username);
      }
    } 
  };
  
  

  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    
    const chatDocRef = doc(db, "chats", combinedId);
    const userChatDocRef = doc(db, "userChats", currentUser.uid);
  
    try {
      const chatDoc = await getDoc(chatDocRef);
      const userChatDoc = await getDoc(userChatDocRef);
  
      if (!chatDoc.exists() || !userChatDoc.exists() || !userChatDoc.data()[combinedId]) {
        // Create a new chat and add users to it
        const userInfo = {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };
  
        await setDoc(chatDocRef, { messages: [] });
        await updateDoc(userChatDocRef, {
          [combinedId]: {
            userInfo,
            date: serverTimestamp(),
          },
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId]: {
            userInfo: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            },
            date: serverTimestamp(),
          },
        });
      } else {
        // Check if the chat was previously deleted
        const userChatData = userChatDoc.data();
        const chatInfo = userChatData[combinedId];
  
        if (chatInfo.deleted) {
          // Restore the chat by removing the deleted status
          await updateDoc(userChatDocRef, {
            [combinedId]: {
              ...chatInfo,
              deleted: false,
            },
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
  
    setUser(null);
    setUsername("");
  };
  

  return (
    <div className="search">
      <div className="searchForm">
      <img src={search} alt="" />
      <input
  type="text"
  placeholder="Поиск пользователя..."
  onKeyDown={handleKey}
  onChange={(e) => {
    if (e.target.value === "" ) {
      setUsername(null);
      setErr(null); 
    } else {
      setUsername(e.target.value);
    }
  }}
  value={username}
/>

      </div>

    {user && (
      <div className="userChat">
        <img src={user.photoURL} alt="" />
        <span>{user.displayName}</span>
        <button onClick={handleSelect}>Начать чат</button>
        <button onClick={() => setUser(null)}>Отменить</button>
      </div>
    )}
       {err && <span className="search-err"><p><img src={search} alt=""/>Не могу никого найти</p></span>}
  </div>
);

};

export default Search;