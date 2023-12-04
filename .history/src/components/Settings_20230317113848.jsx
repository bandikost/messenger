import React, {useState, useContext} from 'react'
import { signOut } from "firebase/auth"
import { auth } from '../firebase'
import email from "../images/email.png"
import info from "../images/info.png"
import { NavLink } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import back from "../images/back.png"


const Settings = () => {
  const [user, setUser] = useState(null);
  const {currentUser} = useContext(AuthContext)
  const chatUser = useState(null);

  return (
   
<div className='home' style={{border: "1px solid black"}}>
<div className="container-settings"><NavLink to={"/main"}><img src={back} width={"25px"} alt="" />Назад</NavLink></div>
    <div className="container" style={{
      border: "1px solid black", 
      width: "20%", height: "auto", 
      flexDirection: "column", 
      backgroundColor: "white"
    }}>
        <div className='settings'><img src={currentUser?.photoURL} alt="" /></div>
        <hr style={{marginTop: "0.1px"}} />

        <div className='name-container'>
            <div className='name'><img src={info} alt="info" width={"25px"} /><p className='suptitle-name'>{currentUser.displayName}</p></div>
            <p className='title-name'>имя пользователя</p>
            <hr />
            <div className='name'><img src={info} alt="info" width={"25px"} /><p className='suptitle-name'>{currentUser.displayName}</p></div>
            <p className='title-name'>почта</p>
            <hr />
            <div className='name'><img src={email} alt="email" width={"25px"} /><p className='suptitle-name'>{currentUser.email}</p></div>
            <p className='title-name'>почта</p>
          <NavLink to={"/login"} onClick={() => signOut(auth)} style={{
          
            display: "flex",
            margin: "0 auto",
            alignItems: "center",
            height: "40px",
            marginTop: "15px",
            justifyContent: "center",
            textDecoration: "none",
            color: "white",
            borderRadius: "8px",
            border: "1px solid black",
            borderBottom: "0px",
            width: "100%",
            backgroundColor: "#3e3c61"
          }}>Выйти</NavLink>
        </div>
     
    </div>
</div>
 
  )
}

export default Settings;