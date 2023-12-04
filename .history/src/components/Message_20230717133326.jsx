import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import PropTypes from "prop-types";
import readedSvg from "../images/readed.svg";
import noReadedSvg from "../images/noreaded.svg";

const Message = ({ message, time, chat }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const IconReaded = ({ isMe, isReaded }) => (
    isMe && (
      isReaded ? (
        <img
          className="message__icon-readed"
          src={readedSvg}
          alt="Readed icon"
        />
      ) : (
        <img
          className="message__icon-readed"
          src={noReadedSvg}
          alt="No readed icon"
        />
      )
    )
  );

  IconReaded.propTypes = {
    isMe: PropTypes.bool,
    isReaded: PropTypes.bool,
  };


  
  return (

    <div ref={ref} className={`message ${ message && message.senderId === currentUser.uid && "owner"}`}>
    {message && (
      <React.Fragment>
        <div className="messageInfo">
        </div>
        <div className="messageContent">
          <div className="messageText">
            <p>{message.text}</p>
          </div>
          <p className="messageTime">{time}</p>
          <div className="messageStatus">
            <IconReaded isMe={message.senderId === currentUser.uid} isReaded={message.isReaded} />
          </div>
          {message.img && <img src={message.img} alt="" />}
        </div>
      </React.Fragment>
    )}
  </div>
  
  
  );
};

export default Message;
