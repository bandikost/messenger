import { doc, onSnapshot, updateDoc, arrayRemove } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Message from "./Message";


const Messages = ({ onClick }) => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <div className="messages" onClick={onClick}>
      <div
        className="message-container"
        style={{ marginTop: "50px", display: messages.length > 0 ? "none" : "flex" }}
      >
        <p>
          Пока что нет сообщений с этим пользователем
          <br />
          Отправьте сообщение, чтобы начать общение (:
        </p>
      </div>  
      {messages.map((message) => (
  <Message message={message} key={message.id} time={message.time} />
))}
    </div>
  );
};

export default Messages;

