// LoginForm.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; //리다이렉션을 위해 임포트
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../firebase-config";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate(); //리다이렉션을 위해 추가

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        navigate('/'); // 이미 로그인된 사용자는 홈으로 리다이렉트
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const login = async () => {
    try {
      await signInWithEmailAndPassword(
        firebaseAuth,
        loginEmail,
        loginPassword
      );
      navigate('/'); // 로그인 후 홈 페이지로 리다이렉트
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
