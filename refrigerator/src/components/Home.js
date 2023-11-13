// ./components/home.js
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import MenuSlider from './MenuSlider';
import MenuModal from './Modal';
import RecipeModal from './RecipeModal'

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentLine, setCurrentLine] = useState(1);
  const recipesPerLine = 8;
  const [slideindex, setSlideIndex] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    fetchRecipes();
  }, []); //컴포넌트가 마운트될때 한번만 실행

  const fetchRecipes = async () => {
    const filePath = '/data/RecipeWithCal.json';
    try {
      const response = await fetch(filePath);
      const data = await response.json();
      setRecipes(data);
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
        )}
      />
      <button onClick={openModal}>모달 열기</button>
      <MenuModal isOpen={modalIsOpen} closeModal={closeModal}>
        <RecipeModal recipe={recipes[0]}/>
      </MenuModal>
    </>
  );
};

export default Home;