import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import "firebase/firestore";
import { NavLink } from "react-router-dom";
import garbage from "../images/chatIcons/garbage.png";
import {
  doc,
  onSnapshot,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import firebase from "firebase/compat/app";

const checkOnlineStatus = async () => {
  try {
    const online = await fetch("/");
    return online.status >= 200 && online.status < 300;
  } catch (err) {
    return false;
  }
};

const Chats = ({ onSelectUser, id }) => { // Add onSelectUser prop here
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [chats, setChats] = useState([]);
  const [status, setStatus] = useState(<status-indicator />);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const result = await checkOnlineStatus();
      setStatus(
        result ? <status-indicator positive /> : <status-indicator />
      );
    }, 300);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    async function handleLoad() {
      setStatus(
        (await checkOnlineStatus()) ? (
          <status-indicator positive />
        ) : (
          <status-indicator />
        )
      );
    }
    window.addEventListener("load", handleLoad);
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  useEffect(() => {
    const getChats = () => {
      const unsub = db
        .collection("userChats")
        .doc(currentUser.uid)
        .onSnapshot((doc) => {
          setChats(doc.data());
        });

      return unsub;
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
    onSelectUser(user);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setMenuPosition({ top: e.clientY, left: e.clientX });
    setIsMenuOpen(true);
  };

  const handleMenuClick = () => {
    setIsMenuOpen(false);
  };

  const handleDelete = () => {
    db.collection("chats").doc(id).delete();
  };

  const handleOutsideClick = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleDocumentClick = () => {
      setIsMenuOpen(false);
    };

    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const handleChatDelete = (chatId) => {
    db.collection("userChats")
      .doc(currentUser.uid)
      .update({
        [chatId]: firebase.firestore.FieldValue.delete(),
      });
  };

  return (
    <>
      {Object.entries(chats)?.map((chat) => {
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
                  position: "fixed",
                  top: menuPosition.top,
                  left: menuPosition.left,
                  zIndex: 100,
                }}
              >
                <ul className="menuContent">
                  <li onClick={() => handleChatDelete(chat[0])}>
                    <img src={garbage} width={"20px"} alt="" />
                    <p className="deleteChat" onClick={handleDelete}>
                      Удалить диалог
                    </p>
                  </li>
                </ul>
              </div>
            )}
            <div onContextMenu={handleContextMenu} onClick={handleOutsideClick}>
              <NavLink
                to={`/main/dialogs/#${chat[0]}`}
                className={`userChat ${isMenuOpen ? "hide" : ""}`}
                onClick={() => handleSelect(chatUser)}
              >
                <img src={chatUser.photoURL} alt="" />
                <div className="userChatInfo">
                  <div className="statusContainer">
                    <span className="statusChats">
                      {chatUser.displayName}
                      <div className="status" id="status">
                        {status}
                      </div>
                    </span>
                  </div>
                  <div className="userChat-container">
                    <p>
                      {chat[1].lastMessage?.userId ===
                      currentUser.uid
                        ? ""
                        : ""}
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
