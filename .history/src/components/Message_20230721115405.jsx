import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import PropTypes from "prop-types";
import readedSvg from "../images/readed.svg";
import noReadedSvg from "../images/noreaded.svg";
import { db } from "../firebase";
import firebase from 'firebase/compat/app';
import you from "../images/chatIcons/chat.png"

const Message = ({ message, time, chat, id }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const { dispatch } = useContext(ChatContext);
  const ref = useRef();
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: "-100px" });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
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

  const handleDelete = () => {
    db.collection('chats').doc(id).delete();
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
      db.collection('userChats').doc(currentUser.uid).update({
      [chatId]: firebase.firestore.FieldValue.delete()
     });
  };
  
  return (

    <div ref={ref} className={`message ${ message && message.senderId === currentUser.uid && "owner"}`}>
    {message && (
      <React.Fragment>
        <div className="messageInfo">
        </div>
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
                <ul className="menuContent" style={{padding: "0px 10px", marginLeft: "-90px", marginTop: "10px"}}>
                  <li onClick={() => handleChatDelete(chat[0])} style={{marginLeft: "35px"}}>
                    <img src="" width={"20px"} style={{marginRight: "0px", marginLeft: "-50px"}} alt="" />
                    <p className="deleteChat" onClick={handleDelete}>редактировать</p>
                  </li>
                </ul>
              </div>
            )}
             <div onContextMenu={handleContextMenu} onClick={handleOutsideClick} >  
        <div className="messageContent">
        
           
          <div className="messageText">
           
            <p>{message.text}</p>
           
          </div>
          <svg  width="9" height="20" className="svg"><defs><filter x="-50%" y="-14.7%" width="200%" height="141.2%" filterUnits="objectBoundingBox" id="messageAppendix"><feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset><feGaussianBlur stdDeviation="1" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur><feColorMatrix values="0 0 0 0 0.0621962482 0 0 0 0 0.138574144 0 0 0 0 0.185037364 0 0 0 0.15 0" in="shadowBlurOuter1"></feColorMatrix></filter></defs><g fill="none" fill-rule="evenodd"><path d="M6 17H0V0c.193 2.84.876 5.767 2.05 8.782.904 2.325 2.446 4.485 4.625 6.48A1 1 0 016 17z" fill="#000" filter="url(#messageAppendix)"></path><path d="M6 17H0V0c.193 2.84.876 5.767 2.05 8.782.904 2.325 2.446 4.485 4.625 6.48A1 1 0 016 17z" fill="#EEFFDE" class="corner"></path></g></svg>
          <p className="messageTime">{time}</p>
          <div className="messageStatus">
            <IconReaded isMe={message.senderId === currentUser.uid} isReaded={message.isReaded} />
          </div>
          {message.img && <img src={message.img} alt="" />}
        </div>
        </div>
      </React.Fragment>
    )}
  </div>
  
  
  );
};

export default Message;
