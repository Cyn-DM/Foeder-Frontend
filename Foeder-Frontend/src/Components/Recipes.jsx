import { useState } from 'react'
import { useEffect } from 'react';

export default function RecipeList() {

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
    <table className='table'>
      <thead>
        <tr>
          <th>Recipe</th>
        </tr>
      </thead>
      <tbody>
        {recipes.map((element) => (
          <tr key={element.id}>
            <td>
              {element.title}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
 
  )

}