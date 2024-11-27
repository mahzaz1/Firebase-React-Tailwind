import React, { useEffect, useState } from "react";
import Colors from "./components/Colors";
import Blogs from "./components/Blogs";
import SocialShare from "./components/SocialShare";
import Tailwind from "./components/Tailwind";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { auth } from "./firebase";
import ProtectedRoute from "./components/ProtectedRoute";
import { onAuthStateChanged } from "firebase/auth";
import ProductDetails from "./components/ProductDetails";

function App() {
  const [user, setUser] = useState(null);
  console.log("user",user?.uid)
 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product-detail/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
