import React, { useContext } from 'react'

import { AuthContext } from '../context/AuthContext'
import { NavLink } from 'react-router-dom'


const Navbar = () => {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className='navbar'>
      <NavLink to={"/main"} className="logo" style={{ color: "white", fontWeight: "bold", fontSize: "20px", textDecoration: "none"}} >bandikost web</NavLink>
      <div className="user">
        <NavLink to={"/main/settings"}>
          <img src={currentUser?.photoURL} alt="" />
        </NavLink>
      </div>
    </div>
  )
}

export default Navbar
