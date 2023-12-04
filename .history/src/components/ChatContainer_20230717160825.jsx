// ChatContainer.jsx
import React, { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import Chats from "./Chats";
import Chat from "./Chat";
import Messages from "./Messages";

const ChatContainer = () => {
  const { data } = useContext(ChatContext);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showChatWindow, setShowChatWindow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setShowChatWindow(true);
  };


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
  
    window.addEventListener("resize", handleResize);
  
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  return (
    <div className="chat-container">
      <div className="chats">
        <Chats onSelectUser={handleSelectUser} showChatWindow={showChatWindow} />
      </div>
      {selectedUser && (
        <div className="chat">
          <Chat user={selectedUser} />
          <Messages user={selectedUser} />
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
