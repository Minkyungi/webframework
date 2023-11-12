// components/RecipeList.js
import React from 'react';
import Recipe from './Recipe'; // Recipe 컴포넌트를 불러옴

const RecipeList = ({ recipes, onRecipeClick }) => {
  return (
    <div className="recipe-list-container">
      <h2>Recipe List</h2>
      <ul className="recipe-list">
        {recipes.slice(0, 3).map((recipe, index) => (
          <Recipe key={index} recipe={recipe} onClick={() => onRecipeClick(recipe)} />
        ))}
      </ul>
      <br /> {/* 줄바꿈 */}
      <ul className="recipe-list">
        {recipes.slice(3).map((recipe, index) => (
          <Recipe key={index} recipe={recipe} onClick={() => onRecipeClick(recipe)}/>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
