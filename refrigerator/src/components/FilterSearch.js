// components/FilterSearch.js
import React from 'react';
import '../styles/FilterSearch.css';

const FilterSearch = ({ setSearchOption, setSearchTerm, setSelectedCategory, setMaxTime, setMaxCalories, handleSearchFilter
    , searchOption, selectedCategory, maxTime, maxCalories, minTime, minCalories, setMinTime, setMinCalories
}) => {
    return (
        <div className="filter-container">
            <form onSubmit={(e) => { e.preventDefault(); handleSearchFilter(); }}>
                <div className='plzCenter'>
                <select
                    value={searchOption}
                    onChange={(e) => setSearchOption(e.target.value)}
                >
                    <option value="foodName">음식명</option>
                    <option value="ingredientName">재료명</option>
                </select>
                <input
                    type="text"
                    placeholder="요리명 혹은 재료명을 입력하세요"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <input type='submit' value='검색' className="search-button" />
                </div>
                <div>
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
                </div>
            </form>
            <div>
                <label htmlFor="maxTime">최대 요리 시간:</label>
                <input
                    type="number"
                    id="maxTime"
                    value={maxTime}
                    onChange={(e) => setMaxTime(e.target.value)}
                    className='time-cal-input'
                />
                <label htmlFor="maxCalories">최대 칼로리:</label>
                <input
                    type="number"
                    id="maxCalories"
                    value={maxCalories}
                    onChange={(e) => setMaxCalories(e.target.value)}
                    className='time-cal-input'
                />
            </div>
            <div>
                <label htmlFor="minTime">최소 요리 시간:</label>
                <input
                    type="number"
                    id="minTime"
                    value={minTime}
                    onChange={(e) => setMinTime(e.target.value)}
                    className='time-cal-input'
                />
                <label htmlFor="minCalories">최소 칼로리:</label>
                <input
                    type="number"
                    id="minCalories"
                    value={minCalories}
                    onChange={(e) => setMinCalories(e.target.value)}
                    className='time-cal-input'
                />
            </div>    
            </div>
    );
};

export default FilterSearch;