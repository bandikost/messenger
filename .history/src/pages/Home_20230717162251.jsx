import React from 'react'
import Sidebar from '../components/Sidebar'
import Input from '../components/Input'

const Home = () => {
  return (
    <div className='home'>
      
      <div className="container">
        <Sidebar />
        
        <div className="chat" >
             
            <div className="messages" style={{backgroundColor: "#ddddf7", padding: "10px", height: "calc(123% - 160px)", overflow: "scroll"}}>
            <div className="main" >Главная страница <br />Вы вряд ли что - то интересное здесь увидите</div>
            </div>
       
        </div>
      </div>
    </div>
  )
}

export default Home