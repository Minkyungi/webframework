// components/RecipeList.js
import React from 'react';
import Recipe from './Recipe';
import '../styles/RecipeList.css'; // 스타일시트 임포트


const RecipeList = ({ recipes, onRecipeClick }) => {
  return (
    <div className="recipe-list-container">
      <div className="grid-container"> {/* grid-container 클래스 추가 */}
        {recipes.map((recipe, index) => (
          <Recipe key={index} recipe={recipe} onClick={() => onRecipeClick(recipe)} />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
