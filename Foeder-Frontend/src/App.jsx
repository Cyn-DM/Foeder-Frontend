import { useState } from 'react'
import { useEffect } from 'react';
import './App.css'

export default function App() {


  return (
    <>
      <RecipeList />
    </>
  )
}

function RecipeList() {

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7058/api/Recipe')
      .then(
        (response) => { 
          return response.json(); }
      )
      .then(
        (data) => {
          setRecipes(data);
        }
      )
  }
    , []
  );



  return(
  <ul>
    {
      recipes.map((recipe) =>
        <li key={recipe.id}>
          <h2>
            {recipe.title}
          </h2>
        </li>
      )
    }
  </ul>
  )

}