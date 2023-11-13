// components/Recipe.js
import React from 'react';

const Recipe = ({ recipe }) => {
  return (
    <>
      <img width={300} height={200} src={recipe.f_photo} alt={recipe.f_name} /> 
      <span>{recipe.f_name}</span>
    </>
  );
};

export default Recipe;
