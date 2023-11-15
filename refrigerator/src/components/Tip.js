// components/Tip.js
import React from 'react';

const Tip = ({ tip,onClick }) => {
  return (
    <>
      <img width={300} height={200} src={tip.t_photo} alt={tip.t_name} onClick={onClick}/> 
      <span>{tip.t_name}</span>
    </>
  );
};

export default Tip;
