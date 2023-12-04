import React from 'react';
import avatar from "../images/addAvatar.png"

export const Login = () => {
  return (
    <div className='formContainer'>
         <div className='formWrapper'>
            <span className="logo">'пока думаю'</span>
            <span className="title">Вход в аккаунт</span>
            <form>
                <input type="email" placeholder='Email'/>
                <input type="password" placeholder='Пароль'/>
                <button>войти</button>
            </form>
            <p>Видимо у вас еще нет аккаунт, пора бы это исправить register</p>
         </div>
    </div>
  )
}

export default Login;