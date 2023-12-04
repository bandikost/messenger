import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import "./style.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.js";
import Dialogs from "./components/Dialogs.jsx";
import Settings from "./components/Settings.jsx";
import ChatContainer from "./components/ChatContainer.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProtectedRoute from "./ProtectedRoute.js";


function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children
  };

  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
          <Route path="/">
          <Route path="/main" element={<Home />}/>

          <ProtectedRoute path="/dialogs" element={<Dialogs />} />
          <ProtectedRoute path="/chat" element={<ChatContainer />} />
          <ProtectedRoute path="/main/settings" element={<Settings />} />
          <ProtectedRoute path="login" element={<Login />} />
          <ProtectedRoute path="register" element={<Register />} />
        </Route>
      </Routes>
    
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;