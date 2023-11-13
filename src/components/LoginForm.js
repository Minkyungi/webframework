// LoginForm.js
import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../firebase-config";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        firebaseAuth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(firebaseAuth);
  };

  return (
    <div className="form-container">
      <h3 style={{ fontSize: "24px", marginBottom: "20px" }}>Login</h3>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <input
          placeholder="Email"
          onChange={(e) => setLoginEmail(e.target.value)}
          className="input-field"
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setLoginPassword(e.target.value)}
          className="input-field"
        />
        <br />
        <button onClick={login} className="action-button login-button">
          Login
        </button>
        <button onClick={logout} className="action-button logout-button">
          Logout
        </button>
        {user && (
          <Link to="/">
            <button
              className="action-button back-home-button"
            >
              GoHome
            </button>
          </Link>
        )}
      </div>
      <div className="logged-in-info">
        User Logged In:
        <br />
        {user?.email}
      </div>
    </div>
  );
};

export default LoginForm;
