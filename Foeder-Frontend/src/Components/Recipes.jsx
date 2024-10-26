import { useState } from 'react'
import { useEffect } from 'react';
import axios from "axios";

export default function RecipeList() {

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    
    if(axios.defaults.headers.common['Authorization'] !== undefined){
      axios.get('Recipe')
      .then((response) => {setRecipes(response.data)})
      .catch((error) => {
        console.log(error);
      });
    }
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