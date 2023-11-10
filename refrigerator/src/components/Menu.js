// components/Menu.js
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import RecipeList from './RecipeList';

const Menu = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 6;
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('foodName'); // 기본값은 음식명

  useEffect(() => {
    fetchRecipes();
  }, []); //컴포넌트가 마운트될때 한번만 실행

  /*const fetchRecipes = async () => {
    const filePath = '/data/RecipeWithCal.json';
    try {
      const response = await fetch(filePath);
      const data = await response.json();
      setRecipes(data);
      return data;
    } catch (error) {
      console.error('파일을 읽는 중 에러가 발생했습니다:', error);
    }
  };*/
  const fetchRecipes = async () => {
    const filePath = '/data/RecipeWithCal.json';
    try {
      const response = await fetch(filePath);
      const data = await response.json();
  
      // f_materials를 배열로 변환
      const recipesWithArrays = data.map((recipe) => ({
        ...recipe,
        f_materials: Array.isArray(recipe.f_materials)
          ? recipe.f_materials
          : [recipe.f_materials], // 문자열을 배열로 변환
      }));
  
      setRecipes(recipesWithArrays);
      return recipesWithArrays;
    } catch (error) {
      console.error('파일을 읽는 중 에러가 발생했습니다:', error);
    }
  };

  /*const handleSearchFilter = async () => {
    try {
      const data = await fetchRecipes();
      let filteredRecipes;
      
      if (searchOption === 'foodName') {
        filteredRecipes = data.filter((recipe) =>
          recipe.f_name.includes(searchTerm)
        );
      } else if (searchOption === 'ingredientName') {
        filteredRecipes = data.filter((recipe) => 
        recipe.f_materials.some(material => 
          material.includes(searchTerm)));
      }

      setRecipes(filteredRecipes);
    } catch (error) {
      console.error('데이터를 불러오는 중 에러가 발생했습니다:', error);
    }
  };
  */
  const handleSearchFilter = async () => {
    try {
      const data = await fetchRecipes();
      let filteredRecipes;
  
      if (searchOption === 'foodName') {
        filteredRecipes = data.filter((recipe) =>
          recipe.f_name.includes(searchTerm)
        );
      } else if (searchOption === 'ingredientName') {
        filteredRecipes = data.filter((recipe) =>
          recipe.f_materials.some((material) =>
            typeof material === 'string' && material.includes(searchTerm)
          )
        );
      }
  
      setRecipes(filteredRecipes);
    } catch (error) {
      console.error('데이터를 불러오는 중 에러가 발생했습니다:', error);
    }
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
      </form>
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