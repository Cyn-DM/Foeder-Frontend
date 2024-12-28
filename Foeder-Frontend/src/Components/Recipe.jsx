import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {UseAuth} from "../Authentication/AuthProvider.jsx";

export function Recipe() {
    const {id} = useParams();
    const {axiosInstance} = UseAuth();
    const [recipe, setRecipe] = useState(null);
    
    
    useEffect(() => {
        axiosInstance.get(`/Recipe/GetRecipe?recipeId=${id}`)
            .then((response) => {setRecipe(response.data); console.log(response.data);})
            .catch((error) => {
                console.log(error);
            });
    }  , []
    );



    if (recipe != null){
        return (
            <div className="recipe-container mb-8">
                <div className="recipe-title-desc-container recipe-part-card">
                    <div className="recipe-title mb-6">
                        {recipe.title}
                    </div>
                    <div className="recipe-description">
                        {recipe.description}
                    </div>
                </div>
                <div className="recipe-image-container recipe-part-card">
                    <RecipeImage />
                </div>
                <div className="ingredients-container flex flex-col basis-20 recipe-part-card">
                    <div className="ingredient-header mb-6">
                        Ingredients
                    </div>

                    <div className="overflow-x-auto bg-base-100 ">

                        <table className="min-w-full text-left text-sm whitespace-nowrap">

                            <thead className="uppercase tracking-wider border-b-2 ">
                            <tr>
                                <th scope="col" className="px-6 py-4">
                                    Ingredient Name
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Amount
                                </th>
                            </tr>
                            </thead>

                            <tbody>
                            {recipe.ingredients.map((ingredient) => (
                                    <tr key={ingredient} className="border-b hover:bg-base-200 ">
                                        <th scope="row" className="px-6 py-4">
                                            {ingredient.name}
                                        </th>
                                        <td className="px-6 py-4">{ingredient.amount}</td>
                                    </tr>
                                )
                            )}


                            </tbody>

                        </table>

                    </div>

                </div>
                <div className="steps-container recipe-part-card">
                    <div className="step-header mb-6">
                        Steps
                    </div>
                    <ol>
                        {recipe.steps.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ol>
                </div>
            </div>

        )
    } 
    
    return (
        <></>
    )
    
}

function RecipeImage({image}) {
    if (image === undefined) {
        return <img src={'/img/No-Image-Placeholder.png'} alt="Not found"/>
    }
}