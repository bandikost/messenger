import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";




const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/main")
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">bandikost web</span>
        <span className="title">Войти</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Sign in</button>
          {err && <span>import * as React from "react";
import StatusIndicator from "@cloudscape-design/components/status-indicator";

export default () => {
  return (
    <StatusIndicator type="error">
      Что-то пошло не так
    </StatusIndicator>
  );
}</span>}
        </form>
        <p>У вас уже есть аккаунт? <Link to="/register">Регистрация</Link></p>
      </div>
    </div>
  );
};

export default Login;