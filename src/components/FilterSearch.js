// components/FilterSearch.js
import React from 'react';

const FilterSearch = ({ setSearchOption, setSearchTerm, setSelectedCategory, setMaxTime, setMaxCalories, handleSearchFilter
, searchOption, selectedCategory, maxTime, maxCalories
}) => {
    return (
        <>
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
                    onChange={() => setSearchOption('ingredientName')}
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
        </>
    );
};

export default FilterSearch;