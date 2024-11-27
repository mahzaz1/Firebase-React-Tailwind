import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";


const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  // console.log("usersssssss",user)
  const [isLogin, setIsLogin] = useState(false); 

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setIsLogin(true); 
    });

    return () => unsubscribe();
  }, []);

  if (!isLogin) return null; 

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
