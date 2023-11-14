// components/Recipe.js
import React from 'react';
import '../styles/Recipe.css'; // 스타일시트 임포트

const Recipe = ({ recipe, onClick }) => {
  return (
    <div className="recipe-card" onClick={onClick}> {/* recipe-card 클래스 추가 */}
      <img className="recipe-image" src={recipe.f_photo} alt={recipe.f_name} />
      <span className="recipe-name">{recipe.f_name}</span>
    </div>
  );
};

export default Recipe;
