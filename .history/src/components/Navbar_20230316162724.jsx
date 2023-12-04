import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className='navbar'>
      <NavLink to={"/main"} className="logo" style={{ color: "white", fontWeight: "bold", fontSize: "20px", textDecoration: "none"}} >bandikost web</NavLink>
      <div className="user">

      <img src={currentUser.photoURL} alt="" />
            <span style={{display: "none"}}>{currentUser.displayName}</span>
            <button onClick={()=>signOut(auth)} >выйти</button>
            <NavLink to={"/settings"}>  </NavLink>
      </div>
      
    </div>
  )
}

export default Navbar