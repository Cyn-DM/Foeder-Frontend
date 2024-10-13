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
    <div className='lg:border lg:border-gray-300 mt-8 p-6 max-w-3xl xl:max-w-4xl 2xl:max-w-7xl mx-auto'>
      <table className='table'>
        <thead>
          <tr className='bg-secondary'>
            <th className='text-2xl text-secondary-content'>Recipe</th>
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
    </div>
     
  )

}