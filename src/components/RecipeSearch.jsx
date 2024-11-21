import React, { useState } from "react";
import axios from "axios";
import "../Styles/RecipeSearch.css"; // Import the CSS file

const RecipeSearch = () => {
  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  const fetchRecipes = async () => {
    if (!ingredient.trim()) {
      setError("Please enter an ingredient.");
      return;
    }

    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );
      if (response.data.meals) {
        setRecipes(response.data.meals);
        setError("");
      } else {
        setRecipes([]);
        setError("No recipes found for this ingredient.");
      }
    } catch (error) {
      setError("An error occurred while fetching recipes.");
      console.error(error);
    }
  };

  return (
    <div className="recipe-container">
      <h1>Recipe Ideas</h1>
      <input
        type="text"
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
        placeholder="Enter an ingredient (e.g., chicken)"
        className="recipe-input"
      />
      <button onClick={fetchRecipes} className="recipe-button">
        Search Recipes
      </button>
      {error && <p className="error-message">{error}</p>}
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <div key={recipe.idMeal} className="recipe-item">
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="recipe-image"
            />
            <h3 className="recipe-title">{recipe.strMeal}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeSearch;
