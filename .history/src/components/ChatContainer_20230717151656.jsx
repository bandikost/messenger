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

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setShowChatWindow(true);
  };

  return (
    <div className="chat-container">
      <div className="chats">
        <Chats onSelectUser={handleSelectUser} />
      </div>
      {showChatWindow && selectedUser && (
        <div className="chat">
          <Chat user={selectedUser} />
          <Messages user={selectedUser} />
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
