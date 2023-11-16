// AlertMessage.js
import React from 'react';

const AlertMessage = ({ message, onClose }) => {
  return (
    <div className="alert-message-container">
      <div className="alert-message-content">
        <p>{message}</p>
        <button onClick={onClose}>확인</button>
      </div>
    </div>
  );
};

export default AlertMessage;
