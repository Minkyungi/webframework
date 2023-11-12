// components/Menu.js
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import RecipeList from './RecipeList';

const Menu = () => {
  const [allRecipes, setAllRecipes] = useState([]); // 전체 레시피를 저장할 상태변수
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 6;
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('foodName'); // 기본값은 음식명
  const [maxTime, setMaxTime] = useState(99); // 최대 요리 시간
  const [maxCalories, setMaxCalories] = useState(600); // 최대 칼로리
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all'은 전체 카테고리를 의미


  useEffect(() => { //전체데이터셋과 현재데이터셋에 json으로부터 읽어온 데이터셋을 담는다
    fetchRecipes();
  }, []); //컴포넌트가 마운트될때 한번만 실행

  useEffect(() => {
    handleSearchFilter();
  }, [selectedCategory]); // selectedCategory가 변경될 때마다 useEffect 실행

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
      recipe.f_time2 <= maxTime && recipe.calories <= maxCalories
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

  return (
    <>
      <h1>현재 메뉴 페이지에 위치</h1>
      <Link to="/">홈 페이지로 이동</Link>
      <br />
      <form onSubmit={(e) => { e.preventDefault(); handleSearchFilter(); }}>
        <input
          type='radio'
          name='radio1'
          value='foodName'
          checked={searchOption === 'foodName'}
          onChange={() => setSearchOption('foodName')}
        />
        음식명
        <input
          type='radio'
          name='radio1'
          value='ingredientName'
          checked={searchOption === 'ingredientName'}
          onChange={()=> setSearchOption('ingredientName')}
        />
        재료명
        <input
          type="text"
          placeholder="요리명 혹은 재료명을 입력하세요"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input type='submit' value='검색' />
        <div>
          <input
            type="radio"
            name="category"
            value="all"
            checked={selectedCategory === 'all'}
            onChange={() => setSelectedCategory('all')}
          /> 전체
          <input
            type="radio"
            name="category"
            value="rice"
            checked={selectedCategory === 'rice'}
            onChange={() => setSelectedCategory('rice')}
          /> 밥
          <input
            type="radio"
            name="category"
            value="dessert"
            checked={selectedCategory === 'dessert'}
            onChange={() => setSelectedCategory('dessert')}
          /> 디저트
          <input
            type="radio"
            name="category"
            value="noodle"
            checked={selectedCategory === 'noodle'}
            onChange={() => setSelectedCategory('noodle')}
          /> 국수
          <input
            type="radio"
            name="category"
            value="soup"
            checked={selectedCategory === 'soup'}
            onChange={() => setSelectedCategory('soup')}
          /> 국
          <input
            type="radio"
            name="category"
            value="sideDish"
            checked={selectedCategory === 'sideDish'}
            onChange={() => setSelectedCategory('sideDish')}
          /> 간식
        </div>
      </form>
      <div>
        <label htmlFor="maxTime">최대 요리 시간:</label>
        <input 
          type="number" 
          id="maxTime" 
          value={maxTime} 
          onChange={(e) => setMaxTime(e.target.value)}
        />
        <label htmlFor="maxCalories">최대 칼로리:</label>
        <input 
          type="number" 
          id="maxCalories" 
          value={maxCalories} 
          onChange={(e) => setMaxCalories(e.target.value)}
        />
    </div>
      <RecipeList
        recipes={recipes.slice(
          (currentPage - 1) * recipesPerPage,
          currentPage * recipesPerPage
        )}
      />
      <div>
        <button onClick={prevPage} disabled={currentPage === 1}>
          이전
        </button>
        <span>{`현재 페이지: ${currentPage}`}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          다음
        </button>
      </div>
    </>
  );
};

export default Menu;