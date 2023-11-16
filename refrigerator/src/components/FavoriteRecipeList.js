// FavoriteRecipeList.js
import React, { useState } from 'react';
import '../styles/FavoriteRecipeList.css';
import FavoriteRecipeModal from './FavoriteRecipeModal';
import AlertMessage from './AlertMessage';
import { observeAuthState } from '../firebase-auth';

const FavoriteRecipeList = ({ favoriteRecipes, onClose }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const recipesPerPage = 6;
  const startIndex = currentPage * recipesPerPage;
  const endIndex = startIndex + recipesPerPage;
  const currentRecipes = favoriteRecipes.slice(startIndex, endIndex);

  const handleRecipeClick = (recipe) => {
    observeAuthState((user) => {
      if (user) {
        setSelectedRecipe(recipe);
        console.log('Clicked on favorite recipe:', recipe);
      } else {
        setAlertMessage('로그인이 필요합니다.');
        setShowAlert(true);
      }
    });
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % Math.ceil(favoriteRecipes.length / recipesPerPage));
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="modal-container1116">
      <div className="modal-content1116">
        <span className="close1116" onClick={onClose}>
          &times;
        </span>
        <h2 className='h2class'>찜한 레시피 목록</h2>
        <ul className="recipes-list1116">
          {currentRecipes.map((recipe) => (
            <li key={recipe.f_name} className="recipe-item1116">
              <img
                className="recipe-image1116"
                src={recipe.f_photo}
                alt={recipe.f_name}
                onClick={() => handleRecipeClick(recipe)}
              />
              <div className="recipe-details1116">
                <span className="recipe-name1116">{recipe.f_name}</span>
                <p className="recipe-description1116">{recipe.f_description}</p>
              </div>
            </li>
          ))}
        </ul>
        {favoriteRecipes.length > recipesPerPage && (
          <div className="page-navigation1116">
            <button onClick={handlePrevPage} disabled={currentPage === 0}>
              이전
            </button>
            <button onClick={handleNextPage}>
              다음
            </button>
          </div>
        )}
        {selectedRecipe && (
          <FavoriteRecipeModal
            recipe={selectedRecipe}
            onClose={() => setSelectedRecipe(null)}
          />
        )}
        {showAlert && (
          <AlertMessage message={alertMessage} onClose={handleCloseAlert} />
        )}
      </div>
    </div>
  );
};

export default FavoriteRecipeList;
