import React from 'react';
import avatar from "../images/addAvatar.png"

export const Login = () => {
  return (
    <div className='formContainer'>
         <div className='formWrapper'>
            <span className="logo">'пока думаю'</span>
            <span className="title">Регистрация </span>
            <form>
                <input type="email" placeholder='Email'/>
                <input type="password" placeholder='Пароль'/>
                <input style={{display: "none"}} type="file" id="file"/>
                <label htmlFor='file'>
                    <img src={avatar} alt="" />
                    <span>Выберите аватар</span>
                </label>
                <button>Зарегистрироваться</button>
            </form>
            <p>Видимо у вас еще нет аккаунт, пора бы это исправить</p>
         </div>
    </div>
  )
}

export default Login;