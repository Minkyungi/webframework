// components/Tip.js
import React from 'react';
import '../styles/Tip.css'; // 스타일시트 임포트

const Tip = ({ tip,onClick }) => {
  return (
    <div className="tip-card" onClick={onClick}> 
       <img className="tip-image" src={tip.t_photo} alt={tip.t_name} />
       <span className="tip-name">{tip.t_name}</span>
    </div>
  );
};

export default Tip;