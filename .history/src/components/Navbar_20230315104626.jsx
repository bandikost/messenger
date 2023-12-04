import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className='navbar'>
      <span className="logo">bandikost web</span>
      <div className="user">

          <img src={currentUser.photoURL} alt="" />
            <span style={{display: "none"}}>{currentUser.displayName}</span>
            <button onClick={()=>signOut(auth)} >выйти</button>
      
      </div>
      
    </div>
  )
}

export default Navbar