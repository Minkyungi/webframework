import React, { useState, useEffect } from 'react';

const RecipeModal = (recipe) => (
<>
    <h2>{recipe.f_name}</h2>
    <img width={300} height={200} src={recipe.f_photo} alt={recipe.f_name}/> 
    <ul className="matrials">
        {recipe.f_materials.map((mat, index) => (<li key={index}>{mat}</li>))}
    </ul>
    <ul className="make">
        {recipe.f_make.map((mat, index) => (<li key={index}>{mat}</li>))}
    </ul>
    <p>{recipe.f_time}</p>
    <p>{recipe.f_url}</p>
</>
)

export default RecipeModal;