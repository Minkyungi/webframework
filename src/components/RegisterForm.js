// RegisterForm.js
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../firebase-config";

const RegisterForm = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        firebaseAuth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="form-container">
      <h3 style={{ fontSize: "24px", marginBottom: "20px" }}>Register</h3>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <input
          placeholder="Email"
          onChange={(e) => setRegisterEmail(e.target.value)}
          className="input-field"
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setRegisterPassword(e.target.value)}
          className="input-field"
        />
        <br />
        <button onClick={register} className="action-button register-button">
          Register
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;