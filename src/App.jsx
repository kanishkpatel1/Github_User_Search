import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { auth, provider } from "./firebaseConfig";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import Logo from "./components/Logo";
import UserInfo from "./Routes/UserInfo";
import Users from "./Routes/Users";

import './App.css'

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // User is signed in
      } else {
        setUser(null); // User is signed out
      }
    });

    return () => {
      unsubscribe(); // Cleanup the listener on unmount
    };
  }, []);

  const handleGithubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Error signing in with GitHub:", error.message);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-black">
      <header className="container text-gray-200 py-3 flex justify-between items-center">
        <Logo />
        {user ? (
          // Render user info if user is signed in
          <div className="flex items-center space-x-3">
            <img
              src={user.photoURL || "/default-profile.png"} // Use a default profile image if photoURL is not available
              alt={user.displayName || "User"}
              className="h-20 w-20 rounded-full"
            />
            <div>
              <p>Welcome <span className="user">{user.displayName || "User"}</span></p>
              <button className="px-5 py-1 font-medium mx-1 my-4 bg-teal-600 rounded text-gray-200" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        ) : (
          // Render login button if user is not signed in
          <div><button  className="px-5 py-1 font-medium mx-1 my-4 bg-teal-600 rounded text-gray-200" onClick={handleGithubLogin}>Login</button>with Github</div>
        )}
      </header>
      <div className="container text-gray-200 py-3">
        <Routes>
          {user ? (
            // Render Users component if user is signed in
            <Route path="/" element={<Users />} />
          ) : (
            // Render a message or alternative component if user is not signed in
            <Route path="/" element={<p>Please sign in to view users.</p>} />
          )}
          <Route path="/:name" element={<UserInfo />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
