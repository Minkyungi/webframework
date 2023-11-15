// components/Menu.js
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import RecipeList from './RecipeList';
import FilterSearch from './FilterSearch';
import RecipeModal from './RecipeModal';
import '../styles/Menu.css'
import Header from './Header';


const Menu = () => {
  const [allRecipes, setAllRecipes] = useState([]); // 전체 레시피를 저장할 상태변수
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 6;
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('foodName'); // 기본값은 음식명
  const [maxTime, setMaxTime] = useState(99); // 최대 요리 시간
  const [maxCalories, setMaxCalories] = useState(600); // 최대 칼로리
  const [minTime, setMinTime] = useState(1); // 최소 요리 시간
  const [minCalories, setMinCalories] = useState(100); // 최소 칼로리
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all'은 전체 카테고리를 의미
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => { //전체데이터셋과 현재데이터셋에 json으로부터 읽어온 데이터셋을 담는다
    fetchRecipes();
  }, []); //컴포넌트가 마운트될때 한번만 실행

  useEffect(() => {
    handleSearchFilter();
  }, [selectedCategory]); // selectedCategory가 변경될 때마다 useEffect 실행

  useEffect(()=>{
    setCurrentPage(1);
  },[recipes])

  const fetchRecipes = async () => { //json에서 전체 데이터셋을 읽어오는 함수
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

  const filterByCategory = (recipes) => {
    if (selectedCategory === 'all') {
      return recipes;
    }
    return recipes.filter(recipe => recipe.category === selectedCategory);
  };


  const handleSearchFilter = () => { //전체데이터셋에서 검색을 실행한 결과를 현재데이터셋에 담는다

    //먼저 칼로리와 요리시간을 기준으로 한 필터 적용
    let filteredRecipes = allRecipes.filter(recipe =>
      recipe.f_time2 <= maxTime && recipe.calories <= maxCalories && recipe.f_time2 >= minTime && recipe.calories >= minCalories
    );

    if (searchOption === 'foodName') { //적용된 필터에서 음식명을 기준으로 검색실행
      filteredRecipes = filteredRecipes.filter(recipe =>
        recipe.f_name.includes(searchTerm)
      );
    } else if (searchOption === 'ingredientName') { //적용된 필터에서 재료명을 기준으로 검색실행
      filteredRecipes = filteredRecipes.filter(recipe =>
        recipe.f_materials.some(material =>
          material.includes(searchTerm)));
    }
    filteredRecipes = filterByCategory(filteredRecipes);
    setRecipes(filteredRecipes); //결과를 반영
  };

  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  const nextPage = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const openModal = (recipe) => {
    console.log('Opening modal for recipe:', recipe);
    setSelectedRecipe(recipe);
  };

  const closeModal = () => {
    console.log('Closing modal');
    setSelectedRecipe(null);
  };

  const subScribe = () => {
    //이곳에 찜하기 기능
  }

  return (
    <div className="menu">
      <Header />
      <FilterSearch
        setSearchOption={setSearchOption}
        setSearchTerm={setSearchTerm}
        setSelectedCategory={setSelectedCategory}
        setMaxTime={setMaxTime}
        setMaxCalories={setMaxCalories}
        handleSearchFilter={handleSearchFilter}
        searchOption={searchOption}
        selectedCategory={selectedCategory}
        maxTime={maxTime}
        maxCalories={maxCalories}
        minTime={minTime}
        minCalories={minCalories}
        setMinTime={setMinTime}
        setMinCalories={setMinCalories}
      />
      <RecipeList
        recipes={recipes.slice(
          (currentPage - 1) * recipesPerPage,
          currentPage * recipesPerPage
        )} onRecipeClick={openModal}
      />
      <RecipeModal recipe={selectedRecipe} onClose={closeModal} onSubscribe={subScribe} />
      <div className="pagination-container">
        <button onClick={prevPage} disabled={currentPage === 1} className='button'>
          이전
        </button>
        <span>{`현재 페이지: ${currentPage}`}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages} className='button'>
          다음
        </button>
      </div>
    </div>
  );
};

export default Menu;