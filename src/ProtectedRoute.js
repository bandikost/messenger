import React, { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If the user is authenticated, render the protected component
  return <Route element={<Element />} {...rest} />;
};

export default ProtectedRoute;
