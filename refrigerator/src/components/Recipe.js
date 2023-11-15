// components/Recipe.js
import React from 'react';

const Recipe = ({ recipe,onClick }) => {
  return (
    <>
      <img width={300} height={200} src={recipe.f_photo} alt={recipe.f_name} onClick={onClick}/> 
      <span>{recipe.f_name}</span>
    </>
  );
};

export default Recipe;
