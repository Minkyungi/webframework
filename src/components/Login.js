// ./components/Login.js
import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "../styles/Login.css"; // 스타일 파일 추가

const Login = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="login-container">
      <div className="button-container">
        <button
          className={showLogin ? "active" : ""}
          onClick={() => setShowLogin(true)}
        >
          Login
        </button>
        <button
          className={!showLogin ? "active" : ""}
          onClick={() => setShowLogin(false)}
        >
          Register
        </button>
      </div>
      <div className="form-container">
        {showLogin ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
};

export default Login;
