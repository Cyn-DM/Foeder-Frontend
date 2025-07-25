import { useState } from 'react'
import { useEffect } from 'react';
import {UseContext} from "../Authentication/ContextProvider.jsx";
import {Link} from "react-router-dom";
import {Bounce, toast, ToastContainer} from "react-toastify";

export default function RecipeList() {

  const [recipes, setRecipes] = useState([]);
  const {axiosInstance, household} = UseContext();



  useEffect(() => {
      axiosInstance.get(`/Recipe?householdId=${household.id}`)
      .then((response) => {setRecipes(response.data)})
      .catch((error) => {
        toast(error.message)
      });
  }
    , []
  );



  return (
    <>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
        />
        <div className="relative mx-auto flex gap-5 px-6 xl:px-96">
            <div className="flex flex-col col-span-12 pt-4">
                <p className="inter-mainFont font-medium text-4xl">
                    Recipes
                </p>
                <div className="flex gap-5">
                    <Link to={"/add-recipe"}>
                        <button
                            className="btn btn-accent btn-main btn-sm flex-none px-4 mt-3 text-white inter-mainFont">Add
                            Recipe
                        </button>
                    </Link>
                    <button className="btn btn-accent btn-main btn-sm flex-none px-4 mt-3 text-white inter-mainFont">
                    Filter
                    </button>
                </div>
            </div>
        </div>
        <div className="flex mx-auto mt-8 px-6 xl:px-96 gap-5 gap-y-10 flex-wrap">

            {recipes.map((recipe) => (
                <ClickableCard recipe={recipe} key={recipe.id} />
            ))}


        </div>
    </>

  )
}

const ClickableCard = ({recipe}) => {
    return (
        <div key={recipe.id} className="card card-compact bg-base-100 w-28 md:w-52 shadow-xl overflow-hidden">
            <Link to={`/recipe/${recipe.id}`} className="block">
                <figure>
                    <img
                        src="/img/food.jpg"
                        alt="Recipe"/>
                </figure>
                <div className="card-body items-center text-center">
                    <div className="card-title text-sm md:text-lg">
                        {recipe.title}
                    </div>
                </div>
            </Link>

        </div>

    )
}