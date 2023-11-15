// ./components/home.js
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import MenuSlider from './MenuSlider';
import TipSlider  from './TipSlider';
import MenuModal from './Modal';
import RecipeModal from './RecipeModal'
import TipModal from './TipModal';

const Home = () => {
  const [allRecipes, setAllRecipes] = useState([]); // 전체 레시피를 저장할 상태변수
  const [recipes, setRecipes] = useState([]);
  const [tips, setTips] = useState([]);
  const [currentLine, setCurrentLine] = useState(1);
  const recipesPerLine = 16;
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedTip, setSelectedTip] = useState(null);
  
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

  useEffect(() => {
    fetchRecipes();
  }, []); //컴포넌트가 마운트될때 한번만 실행

  useEffect(()=>{
    fetchTips();
  },[]);
  
  const fetchRecipes = async () => {
    const filePath = '/data/RecipeWithCal.json';
    try {
      const response = await fetch(filePath);
      const data = await response.json();
      setAllRecipes(data);
      setRecipes(data);
      return data;
    } catch (error) {
      console.error('파일을 읽는 중 에러가 발생했습니다:', error);
    }
  };
  const fetchTips = async () => {
    const filePath = '/data/Tip.json';
    try {
      const response = await fetch(filePath);
      const data = await response.json();
      setTips(data);
      return data;
    } catch (error) {
      console.error('파일을 읽는 중 에러가 발생했습니다:', error);
    }
  };

  return (
    <>
      <h1>냉장고를 부탁해~</h1>
      <Link to="/menu">메뉴 페이지로 이동</Link>
      <p></p>
      <Link to="/login">로그인 페이지로 이동</Link>
      <MenuSlider
        recipes={recipes.slice(
          (currentLine - 1) * recipesPerLine,
          currentLine * recipesPerLine
        )} onClick={openModal} />
      <TipSlider 
        tips={tips} onClick={openTipModal}/>
      <RecipeModal recipe={selectedRecipe} onClose={closeModal}/>
      <TipModal tip={selectedTip} onClose={closeTipModal}/>
    </>
  );
};

export default Home;