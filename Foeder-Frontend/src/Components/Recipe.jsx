import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {UseAuth} from "../Authentication/AuthProvider.jsx";
import {Bounce, toast, ToastContainer} from "react-toastify";

export function Recipe() {
    const {id} = useParams();
    const {axiosInstance} = UseAuth();
    const [recipe, setRecipe] = useState(null);
    const nav = useNavigate();
    
    
    useEffect(() => {
        axiosInstance.get(`/Recipe/GetRecipe?recipeId=${id}`)
            .then((response) => {setRecipe(response.data); console.log(response.data);})
            .catch((error) => {
                console.log(error);
            });
    }  , []
    );
    
    const handleDelete = () => {
        toast(<IsAcceptedButtons/>)
    }
    
    const acceptDelete = ( closeToast ) => {
        closeToast();
        axiosInstance.delete(`/Recipe/DeleteRecipe?recipeId=${id}`)
            .then((response) => {
                toast.success("successfully deleted recipe", {onClose: () => nav('/recipes'), autoClose: 5000})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function IsAcceptedButtons({ closeToast }){
        return (
            <div className="flex gap-4 inter-mainFont p-4">
                <div>Are you sure you want to delete the recipe?</div>
                <button onClick={() => acceptDelete(closeToast)} className="btn btn-sm btn-accent">Yes</button>
                <button onClick={closeToast} className="btn btn-sm btn-error">No</button>
            </div>
        )
    }


    if (recipe != null){
        return (
            <>
                <ToastContainer
                    position="top-right"
                    autoClose={false}
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
                <div className="recipe-container mb-8">
                    <div className="recipe-title-desc-container recipe-part-card">
                        <div className="recipe-title mb-6">
                            {recipe.title}
                        </div>
                        <div className="recipe-description">
                            {recipe.description}
                        </div>
                        <div className="recipe-button-container">
                            <Link to={`/edit-recipe/${recipe.id}`}>
                                <button className="btn btn-accent btn-sm text-white">Edit</button>
                            </Link>
                            <button className="btn btn-sm btn-error" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                    <div className="recipe-image-container recipe-part-card">
                        <RecipeImage/>
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
            </>


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