import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import "firebase/firestore";
import { NavLink } from "react-router-dom";
import firebase from "firebase/compat/app";

const checkOnlineStatus = async () => {
  try {
    const online = await fetch("/");
    return online.status >= 200 && online.status < 300;
  } catch (err) {
    return false;
  }
};

const Chats = ({ onSelectUser, selectedUser, selectedChatId, id }) => {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [chats, setChats] = useState([]);
  const [status, setStatus] = useState(<status-indicator />);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatContent, setChatContent] = useState({});
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);


  useEffect(() => {
    const intervalId = setInterval(async () => {
      const result = await checkOnlineStatus();
      setStatus(result ? <status-indicator positive /> : <status-indicator />);
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
    if (typeof onSelectUser === "function") {
      onSelectUser(user);
    }
  };

  const handleContextMenu = (e, chatId) => {
    e.preventDefault();
    setSelectedChat(chatId);
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
    // Delete the chat document from the "chats" collection
    db.collection("chats").doc(chatId).delete();

    // Remove the chat from the user's chats list in the "userChats" collection
    db.collection("userChats")
      .doc(currentUser.uid)
      .update({
        [chatId]: firebase.firestore.FieldValue.delete(),
      });
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

  useEffect(() => {
    if (selectedChat) {
      localStorage.setItem("selectedChatId", selectedChat);
    }
  }, [selectedChat]);

  useEffect(() => {
    const fetchChatContent = async () => {
      try {
        const chatRef = db.collection("chats").doc(selectedChatId);
        const chatSnapshot = await chatRef.get();
        if (chatSnapshot.exists()) {
          setChatContent(chatSnapshot.data());
        } else {
          setChatContent({});
        }
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
    };

    if (selectedChatId) {
      fetchChatContent();
    }
  }, [selectedChatId]);

  useEffect(() => {
    const storedChatId = localStorage.getItem("selectedChatId");
    if (storedChatId) {
      setSelectedChat(storedChatId);
    }
  }, []);


  return (
    <>
        {Object.entries(chats)?.map((chat) => {
        const chatUser = chat[1].userInfo;
        if (!chatUser || !currentUser) {
          return null;
        }

        const isChatSelected = selectedUser && selectedUser.uid === chatUser.uid;
        const chatId = chat[0];


        return (
          <div key={chat[0]}>
             <div
              onContextMenu={(e) => handleContextMenu(e, chatId)}
              onClick={handleOutsideClick}
            >
              <NavLink
                to={`/dialogs/#${chatId}`}
                className={`userChat ${isChatSelected ? "selected" : ""}`}
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
                      {chat[1].lastMessage?.userId === currentUser.uid ? (
                        ""
                      ) : (
                        ""
                      )}
                      {chat[1].lastMessage?.text}
                    </p>
                  </div>
                </div>
              </NavLink>
            </div>
            {isMenuOpen && menuPosition && selectedChat === chatId && ( // Show the delete button only for the selected chat
              <div
                className="right-click-menu"
                style={{
                  position: "fixed",
                  top: menuPosition.top,
                  left: menuPosition.left,
                  zIndex: 100,
                }}
              >
                {/* Add the delete button/icon inside the context menu */}
                <button className="delete-user" onClick={() => handleChatDelete(chatId)}>
                  Удалить диалог
                </button>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default Chats;
