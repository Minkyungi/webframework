// components/RecipeModal.js
import React from 'react';
import '../styles/RecipeModal.css'; // CSS 파일 임포트

const RecipeModal = ({ recipe, onClose }) => {
    if (!recipe) return null;
    let category;
    switch(recipe.category){
        case("rice") : category = "밥"; break;
        case("noodle") : category = "면"; break;
        case("soup") : category = "국"; break;
        case("dessert") : category = "디저트"; break;
        case("sideDish") : category = "간식"; break;
    }

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <div className="modal-header">{recipe.f_name}</div>
                <div className="modal-body">
                    <img width={300} height={200} src={recipe.f_photo} alt={recipe.f_name}/>
                    <h3>재료</h3>
                    <ul className="ingredients-list">
                        {recipe.f_materials.map((x, i) => <div key={i}>{x}</div>)}
                    </ul>
                    <h3>조리 순서</h3>
                    <ol className="cooking-steps">
                        {recipe.f_make.map((x, i) => <div key={i}>{x}</div>)}
                    </ol>
                    {recipe.f_url && <div>관련 영상: <a href={recipe.f_url}>{recipe.f_url}</a></div>}
                    <div>칼로리: {recipe.calories}</div>
                    <div>조리 시간: {recipe.f_time}</div>
                    <div>카테고리: {category}</div>

                </div>
                <div className="modal-footer">
                    <button onClick={onClose}>닫기</button>
                </div>
            </div>
        </div>
    );
};

export default RecipeModal;
