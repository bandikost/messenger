import React, { useContext, useEffect, useState } from 'react'
import 'status-indicator/styles.css'
import { NavLink } from 'react-router-dom'
// Компоненты

import Messages from './Messages'
import Input from './Input'
import { ChatContext } from "../context/ChatContext";

// Для очистки сообщений в чате с пользователем
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useParams } from 'react-router-dom';


//Изображения
import back from "../images/back.png"
import camera from "../images/chatIcons/cam.png";
import add from "../images/chatIcons/add.png";
import more from "../images/chatIcons/more.png";
import moreButton from "../images/chatIcons/more-button.png";
import deleteChat from "../images/chatIcons/delete.png";
import search from "../images/chatIcons/search.png";
import volume from "../images/chatIcons/volume.png";
import Wvolume from "../images/chatIcons/Wvolume.png";


const checkOnlineStatus = async () => {
  try {
    const online = await fetch("/");
    return online.status >= 200 && online.status < 300;
  } catch (err) {
    return false;
  }
};


export const Chat = () => {
  const { data } = useContext(ChatContext)
  // Дроп-меню

  const [isOpen, setIsOpen] = useState(false);
  const [isOpens, setIsOpens] = useState(false);
  const [isOpenClear, setisOpenClear] = useState(false);

  // Открывает изображение покрупнее

  const [showImage, setShowImage] = useState(false);

  // Функция для переключения состояния при нажатии на изображение

  const handleImageClick = () => {
    setShowImage(!showImage);
  };


  // Очищает сообщения в чате с пользователем

  const [setShowMessages] = useState(true);

  const handleClearMessages = async () => {
    try {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: [],
      });
      setIsOpen(false)
      setisOpenClear(false)
    } catch (error) {
      console.error("Не получается очистить сообщения: ", error);
    
    }

    setShowMessages(false);
  };

  const [status, setStatus] = useState(<status-indicator />);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const result = await checkOnlineStatus();
      setStatus(result ? <status-indicator positive pulse /> : <status-indicator />);
    }, 30);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    async function handleLoad() {
      setStatus((await checkOnlineStatus()) ? <status-indicator positive pulse /> : <status-indicator />);
    }
    window.addEventListener("load", handleLoad);
    return () => window.removeEventListener("load", handleLoad);
  }, []);


  return (
 
   
   <></>
  )
}

export default Chat;