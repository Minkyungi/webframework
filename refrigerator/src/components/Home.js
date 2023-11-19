// ./components/Home.js
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import MenuSlider from './MenuSlider';
import Header_Home from './Header_Home';
import TipSlider  from './TipSlider';
import RecipeModal_Home from './RecipeModal_Home';
import TipModal from './TipModal';
import FavoriteRecipeList from './FavoriteRecipeList';
import { observeAuthState } from '../firebase-auth';
import styled from 'styled-components';
//import '../styles/Home.css';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #3498db; /* 링크 텍스트 색상 */
  font-weight: bold;
  background: cornsilk;
  padding: 20px; /* 링크 간 간격을 위한 우측 여백 */
  display: 'inline-block';
  &:hover {
    color: #2980b9; /* 호버 시 텍스트 색상 변경 
  }
`;

const Home = () => {
  const [allRecipes, setAllRecipes] = useState([]); // 전체 레시피를 저장할 상태변수
  const [recipes, setRecipes] = useState([]);
  const [tips, setTips] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedTip, setSelectedTip] = useState(null);
  const [user, setUser] = useState(null);
  const [showFavoriteModal, setShowFavoriteModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const getRandomInts = (min, max, count) => {
    const randomInts = [];
    while (randomInts.length < count) {
      const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!randomInts.includes(randomInt)) {
        randomInts.push(randomInt);
      }
    }
    return randomInts;
  };

  useEffect(() => {
    fetchRecipes();
    fetchTips();
    // 사용자의 로그인 상태를 관찰하여 업데이트
    observeAuthState((authUser) => {
      setUser(authUser);
    });
  }, []); //컴포넌트가 마운트될때 한번만 실행
  
  const fetchRecipes = async () => { //json에서 전체 데이터셋을 읽어오는 함수
    const filePath = '/data/RecipeWithCal.json';
    try {
      const response = await fetch(filePath);
      const data = await response.json();
      const randomRecipeIndices = getRandomInts(0, data.length - 1, 8);
      const selectedRecipes = randomRecipeIndices.map(index => data[index]);
      setRecipes(selectedRecipes);
      setAllRecipes(data);
      return data;
    } catch (error) {
      console.error('파일을 읽는 중 에러가 발생했습니다:', error);
    }
  };
  
  const fetchTips = async () => {
    const filePath = './data/Tip.json';
    try {
      const response = await fetch(filePath);
      const data = await response.json();
      setTips(data);
      return data;
    } catch (error) {
      console.error('파일을 읽는 중 에러가 발생했습니다:', error);
    }
  };

  const fetchFavoriteRecipes = () => {
    if (user && user.favorites) {
      // 사용자가 로그인되어 있고 찜한 레시피가 있는 경우
      const favoriteRecipes = user.favorites.map((favoriteRecipeId) => {
        // 찜한 레시피의 ID를 기반으로 전체 레시피 데이터에서 찾음
        return allRecipes.find((recipe) => recipe.f_name === favoriteRecipeId);
      });

      return favoriteRecipes.filter((recipe) => recipe); // undefined인 요소 필터링
    }
    return [];
  };

  const favoriteRecipes = fetchFavoriteRecipes();

  const openTipModal = (tip) => {
    setSelectedTip(tip);
  };

  const closeTipModal = () => {
    setSelectedTip(null);
  };
  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const closeModal = () => {
    setSelectedRecipe(null);
  };
  const openFavoriteModal = () => {
    setShowFavoriteModal(true);
  };

  const closeFavoriteModal = () => {
    setShowFavoriteModal(false);
  };


  const handleToggleFavorite = (recipeId) => {
    if (!user) {
      // 사용자가 로그인되지 않은 경우
      console.log('로그인이 필요합니다.');
      setAlertMessage('로그인이 필요합니다.');
      setShowAlert(true);
      return;
    }
    // 클릭한 레시피를 찾음
    const clickedRecipe = allRecipes.find((recipe) => recipe.f_name === recipeId);

    // 레시피가 없으면 종료
    if (!clickedRecipe) {
      console.log('레시피를 찾을 수 없습니다.');
      return;
    }

    // 클릭한 레시피가 이미 찜한 상태이면 해제, 아니면 추가
    const isFavorite = user?.favorites?.includes(clickedRecipe.f_name);

    // 변경된 레시피 목록을 로컬 스토리지에 저장
    const updatedRecipes = recipes.map((recipe) => {
      if (recipe.f_name === clickedRecipe.f_name) {
        return {
          ...recipe,
          isFavorite: !isFavorite,
        };
      }
      return recipe;
    });

    // 화면에 표시할 레시피 목록을 업데이트
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));

    // 화면에 표시할 레시피 목록을 업데이트
    setRecipes(updatedRecipes);
    // 즉시 새로운 상태를 사용하여 isFavorite 값 업데이트
    const updatedIsFavorite = !isFavorite;
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.f_name === clickedRecipe.f_name
          ? { ...recipe, isFavorite: !isFavorite }
          : recipe
      )
    );

    setAlertMessage('찜하기 완료'); // 찜하기 완료 메시지 설정
    setShowAlert(true); // 찜하기 완료 창 표시
  };


  return (
    <>
      <Header_Home openFavoriteModal={openFavoriteModal} showFavoritesButton />
      <div className='home-container'>
        <div className="title">
        <h1 style={{ display: 'inline-block' }}>냉장고를 부탁해~ </h1><br/>
        <StyledLink to="/menu">〉 레시피목록 페이지로 이동 〈</StyledLink></div>
        <p></p>
        <MenuSlider recipes={recipes} onClick={openModal} />
        {tips.length > 0 && (<TipSlider tips={tips} onClick={openTipModal}/>)}
        <TipModal tip={selectedTip} onClose={closeTipModal}></TipModal>
        <RecipeModal_Home recipe={selectedRecipe} onClose={closeModal} user={user} handleToggleFavorite={handleToggleFavorite}/>
      </div>
    </>
  );
};

export default Home;