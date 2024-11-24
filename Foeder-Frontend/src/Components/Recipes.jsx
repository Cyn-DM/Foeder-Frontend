import { useState } from 'react'
import { useEffect } from 'react';
import {UseAuth} from "../Authentication/AuthProvider.jsx";

export default function RecipeList() {

  const [recipes, setRecipes] = useState([]);
  const {setAccessTokenFromRefresh, axiosInstance} = UseAuth();
  useEffect(() => {
      axiosInstance.get('/Recipe')
      .then((response) => {setRecipes(response.data)})
      .catch((error) => {
        if (error.response && error.response.status === 401) {
            setAccessTokenFromRefresh;
        }
      });
  }
    , []
  );



  return (
      // <div className='lg:border lg:border-gray-300 mt-8 p-6 max-w-3xl xl:max-w-4xl 2xl:max-w-7xl mx-auto'>
      //   <table className='table'>
      //     <thead>
      //       <tr className='bg-secondary'>
      //         <th className='text-2xl text-secondary-content'>Recipe</th>
      //       </tr>
      //     </thead>
      //     <tbody>

      //     </tbody>
      //   </table>
      // </div>
    <>
        <div className="relative mx-auto grid grid-cols-12 gap-5 px-4 md:px-8">
            <div className="flex flex-col col-span-12 pt-4 px-2 md:px-16">
                <p className="inter-mainFont font-medium text-4xl">
                    Recipes
                </p>
                <div className="flex gap-5">
                    <button className="btn btn-accent btn-main btn-sm flex-none px-4 mt-3 text-white inter-mainFont">Add
                        Recipe
                    </button>
                    <button className="btn btn-accent btn-main btn-sm flex-none px-4 mt-3 text-white inter-mainFont">
                        Filter
                    </button>
                </div>
            </div>
        </div>
        <div className="flex px-4 md:px-8 gap-5 flex-wrap">

            {recipes.map((element) => (
                <div key={element.id} className="card card-compact bg-base-100 w-96 shadow-xl">
                    <div className="card-body items-center text-center" >
                      <div className="card-title">
                      {element.title}
                      </div>
                    </div>
                </div>
            ))}


        </div>
    </>

  )
}