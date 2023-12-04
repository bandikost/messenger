import React, { useContext, useState, useEffect } from "react";
import Img from "../images/img.png";
import Attach from "../images/attach.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { format } from "date-fns"
import back from "../images/back.png"


const Input = () => {
  const [fixedTime, setFixedTime] = useState(null);
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [isSendButtonDisabled, setIsSendButtonDisabled] = useState(false);
  const [fixedDate, setFixedDate] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);


  const timeDate = format(new Date(), "H : mm ");

  const handleClick = () => {
    const timeDate = format(new Date(), "H : mm ");
    const fixedDate = format(new Date(), "dd MMMM ");
    handleSend(timeDate);
    setFixedDate(fixedDate);
  };
  
  const handleSend = async (timeDate) => {
    // Append fixed time to message text if it's set
    const messageText = text;
  
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
  
      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(
            async (downloadURL) => {
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text: messageText,
                  time: timeDate, // use the timeDate argument here
                  senderId: currentUser.uid,
                  img: downloadURL,
                }),
              });
            }
          );
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text: messageText,
          time: timeDate, // use the timeDate argument here
          senderId: currentUser.uid,
        }),
      });
    }
  
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text: messageText,
        time: timeDate, // use the timeDate argument here
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
  
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text: messageText,
        time: timeDate, // use the timeDate argument here
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
  
    setText("");
    setFixedTime("");
    setImg(null);
  };

  
  useEffect(() => {
    if (text === "" && img === null) {
      setIsSendButtonDisabled(true);
    } else {
      setIsSendButtonDisabled(false);
    }
  }, [text, img]);


  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    // Initial check on component mount
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return ( 
    <div className="input">
    <input
      type="text"
      placeholder="Наберите сообщение..."
      onChange={(e) => setText(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && text.trim()) {
          handleClick();
        }
      }}
      value={text}/>
      
      <div className="send">
        <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          multiple
          onChange={(e) => setImg(e.target.files[0])}
        />
        
        <label htmlFor="file">
          <img style={{position: "relative", top: "3px"}} src={Img} alt="" />
        </label>
      
        <button
      onClick={handleClick}
      style={{ borderRadius: '5px' }}
      disabled={isSendButtonDisabled}
    >
      {isSmallScreen ? <img src={back} width={"10px"} alt="Icon" style={{display: "flex"}} /> : 'Отправить'}
    </button>
        
      </div>
    </div>
  );
  }
export default Input;