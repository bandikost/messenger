import { doc, onSnapshot, updateDoc, arrayRemove } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import Messages from "./Messages";
import firebase from 'firebase/app';
import 'firebase/firestore';
import { NavLink } from "react-router-dom";
import garbage from "../images/chatIcons/garbage.png"
import { Link } from "react-router-dom";


const checkOnlineStatus = async () => {
  try {
    const online = await fetch("/");
    return online.status >= 200 && online.status < 300;
  } catch (err) {
    return false;
  }
};

const ChatsItem = ({ id }) => {
  const handleDelete = () => {
    // Implement the deletion logic using the ID
    // Example: db.collection('chats').doc(id).delete();
  };

  return (
    <div className="chats-item" onClick={handleDelete}>
      {/* Display the chat item content */}

    </div>
  );
};

const Chats = () => {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [chats, setChats] = useState([]);
  const [status, setStatus] = useState(<status-indicator />);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const result = await checkOnlineStatus();
      setStatus(result ? <status-indicator positive /> : <status-indicator />);
    }, 300);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    async function handleLoad() {
      setStatus((await checkOnlineStatus()) ? (
        <status-indicator positive />
      ) : (
        <status-indicator />
      ));
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
    setMenuPosition({ top: e.clientY, left: e.clientX });
    setIsMenuOpen(true);
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

  const handleChatDelete = (chatId) => {
    // Implement the chat deletion logic using the chatId
    // Example: db.collection('userChats').doc(currentUser.uid).update({
    //   [chatId]: firebase.firestore.FieldValue.delete()
    // });
  };

  return (
    <>
      {Object.entries(chats)?.sort((a,b) => b[1].date - a[1].date).map((chat) => {
        const chatUser = chat[1].userInfo;
        if (!chatUser || !currentUser) {
          return null;
        }

        return (
          <div key={chat[0]}>
            {isMenuOpen && (
              <div
                className="right-click-menu"
                style={{
                  position: 'fixed',
                  top: menuPosition.top,
                  left: menuPosition.left,
                  zIndex: 100,
                }}
              >
                <ul className="menuContent">
                  <li onClick={() => handleChatDelete(chat[0])}>
                    <img src={garbage} width={"20px"} alt="" />
                    <p>Удалить диалог</p>
                  </li>
                </ul>
              </div>
            )}
            <div onContextMenu={handleContextMenu} onClick={handleOutsideClick} ><p>{id}</p>
              <NavLink to={"/main/dialogs"} className="userChat" onClick={() => handleSelect(chatUser)}>
                <ChatsItem id={chat[0]} />
                <img src={chatUser.photoURL} alt="" />
                <div className="userChatInfo">
                  <div className="statusContainer">
                    <span className="statusChats">{chatUser.displayName}
                      <div className='status' id="status">{status}</div>
                    </span>
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
          </div>
        );
      })}
    </>
  );
};

export default Chats;