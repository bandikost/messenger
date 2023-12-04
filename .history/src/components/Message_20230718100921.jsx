import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import PropTypes from "prop-types";
import readedSvg from "../images/readed.svg";
import noReadedSvg from "../images/noreaded.svg";
import { db } from "../firebase";
import firebase from 'firebase/compat/app';

const Message = ({ message, time, chat, id }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const { dispatch } = useContext(ChatContext);
  const ref = useRef();
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
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

    <></>
  
  
  );
};

export default Message;
