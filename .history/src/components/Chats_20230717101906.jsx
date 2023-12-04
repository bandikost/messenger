import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Messages from "./Messages";
import firebase from 'firebase/app';
import 'firebase/firestore';
import { NavLink } from "react-router-dom";

const checkOnlineStatus = async () => {
  try {
    const online = await fetch("/");
    return online.status >= 200 && online.status < 300;
  } catch (err) {
    return false;
  }
};

const ChatsItem = (props) => {
  let path = "dialogs/" + props.id;

  return (
    <div className="dialog-item">
      <NavLink to={path}> {props.name} </NavLink>
    </div>
  );
};

const Chats = () => {
  const {currentUser} = useContext(AuthContext) 
  const { dispatch } = useContext(ChatContext);
  const [chats, setChats] = useState([]);
  const [status, setStatus] = useState(<status-indicator />);
  const [menuPosition, setMenuPosition] = useState({ top: "10px", left: "-100px" });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const result = await checkOnlineStatus();
      setStatus(result ? <status-indicator positive/> : <status-indicator  />);
    }, 300);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    async function handleLoad() {
      setStatus((await checkOnlineStatus()) ? <status-indicator positive /> : <status-indicator  />);
    }
    window.addEventListener("load", handleLoad);
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setIsMenuOpen(true);
    setMenuPosition({ top: e.pageY, left: e.pageX });
  };

  const handleMenuClick = () => {
    setIsMenuOpen(false);
  };

  const handleOutsideClick = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleDocumentClick = () => {
      setIsMenuOpen(false);
    };

    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
   <>
  {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => {
    const chatUser = chat[1].userInfo;
    if (!chatUser || !currentUser) {
      return null; 
    }
    return (
      <div onContextMenu={handleContextMenu} onClick={handleOutsideClick}>
      <NavLink to={"/main/dialogs"} className="userChat" key={chat[0]} onClick={() => handleSelect(chatUser)}>
        <ChatsItem  id={chat[1]?.userInfo?.uid} />
        <img src={chatUser.photoURL} alt="" />
        <div className="userChatInfo">
        <div className="statusContainer">
        <span className="statusChats">{chatUser.displayName}
            <div className='status' id="status">{status}</div> 
          </span>
          <button>1</button>
        </div>
          <div className="userChat-container">
            <p>
              {chat[1].lastMessage?.userId === currentUser.uid ? "" : "Вы: "}
              {chat[1].lastMessage?.text}
            </p>
          </div>
        </div>
      </NavLink>
      </div>
    )
  })}
</>

  );
};


export default Chats;
