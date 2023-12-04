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

const Navigator = () => {
  const navigate = useNavigate();
  const [isPaid, setIsPaid] = useState(true);

  useEffect(() => {
    if (isPaid && window.location.pathname === "/") { 
      navigate("/login"); 
    }
  }, [isPaid, navigate]);

}

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children
  };

  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="/main" element={<Home />}/>
          <Route path="/dialogs" element={<Dialogs />} />
          <Route path="/chat" element={<ChatContainer />} />
          <Route path="/main/settings" element={<Settings />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
      <Navigator />
    </BrowserRouter>

  );
}

export default App;