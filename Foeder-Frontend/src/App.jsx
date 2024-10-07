import { useState } from 'react'
import { useEffect } from 'react';

export default function App() {


  return (
    <>
      <Header />
      <RecipeList />
    </>
  )
}

function Header(){
  return (
    <div className="navbar bg-neutral flex">
      <div className="flex-1">
        <a className='btn btn-primary text-primary-content'>Foeder</a>
      </div>
      <div className="flex-auto">
        <ul className="menu menu-horizontal">
          <li><a className='text-neutral-content'>Recipes</a></li> 
        </ul>
      </div>
    </div>
  )
}

// function ContentBox(){
//   return (

//   )
// }


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