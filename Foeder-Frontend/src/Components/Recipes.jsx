import { useState } from 'react'
import { useEffect } from 'react';
import {UseAuth} from "../Authentication/AuthProvider.jsx";

export default function RecipeList() {

  const [recipes, setRecipes] = useState([]);
  const {getAccessToken, axiosInstance} = UseAuth();
  useEffect(() => {
      axiosInstance.get('/Recipe')
      .then((response) => {setRecipes(response.data)})
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          getAccessToken();
        }
      });
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