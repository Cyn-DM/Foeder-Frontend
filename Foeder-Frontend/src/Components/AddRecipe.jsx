import {useState} from "react";
import {UseContext} from "../Authentication/ContextProvider.jsx";
import {useFieldArray, useForm} from "react-hook-form";
import {Bounce, toast, ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";

export default function AddRecipe(){
    const {axiosInstance, household} = UseContext();
    const nav = useNavigate();

    const { register, control, handleSubmit, formState: { errors },} = useForm();
    const { fields: fieldsStep, append : appendStep, remove: removeStep } = useFieldArray( {control, name: "Steps", rules: { required: "Please fill in at least one step."}});
    const { fields: fieldsIngredient, append : appendIngredient, remove: removeIngredient } = useFieldArray( {control, name: "Ingredients", rules: {required: "Please fill in at least one ingredient."} });



    const handleRecipeSubmit = (data) => {

        if (data.Steps && Array.isArray(data.Steps)) {
            data.Steps = data.Steps.map(stepObj => stepObj.step);
        }

        data.HouseholdId = household.id;

        axiosInstance.post("/Recipe/AddRecipe", data)
            .then(() => {
                toast.success('Successfully added recipe.',{onClose: () => nav('/recipes')});
            })
            .catch((error) => {
            console.log(error);
        })

    }


    return (<>
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

            <div className="add-recipe-container mb-8">
                <div className="add-recipe-title-desc-container recipe-part-card">
                    {errors?.Title && (
                        <p className="text-red-800" role="alert">{errors.Title.message}</p>
                    )}
                    <div className="recipe-title mb-6">
                        <div className="flex">
                            <label htmlFor="title">Title</label>
                        </div>
                    </div>
                    <input type="text"
                           {...register("Title", {
                               required: "A title is required", maxLength: {
                                   value: 100,
                                   message: "Title should be less than 100 characters.",
                               }
                           })
                           }
                           className="input input-bordered w-full max-w-sm mb-3"
                           placeholder="Title"
                    />
                    <div className="recipe-description">
                        {errors?.Description && (
                            <p className="text-red-800" role="alert">{errors.Description.message}</p>
                        )}
                        <div className="add-recipe-description mb-6">
                            <label htmlFor="description">Description</label>
                        </div>
                        <textarea
                            {...register("Description", {
                                required: false, maxLength: {
                                    value: 250,
                                    message: "Description should be less than 250 characters.",
                                }
                            })}
                            className="textarea textarea-bordered textarea-md w-full"
                            placeholder="Description"
                        />
                    </div>
                </div>
                <div className="add-recipe-image-container recipe-part-card">

                </div>
                <div className="add-recipe-image-buttons-container">
                    <input type="file"
                           className="file-input file-input-bordered file-input-accent w-full  mb-4"/>
                    <button type="button" className="btn btn-accent w-full text-white">Upload photo
                    </button>
                </div>
                <div className="add-ingredients-container flex flex-col basis-20 recipe-part-card">
                    <div className="ingredient-header mb-6">
                        Ingredients
                    </div>
                    <div className="overflow-x-auto bg-base-100 ">
                        <IngredientList fields={fieldsIngredient} append={appendIngredient} 
                                        remove={removeIngredient} register={register} errors={errors}/>
                    </div>
                </div>
                <div className="add-steps-container recipe-part-card">
                    <div className="step-header mb-6">
                        Steps
                    </div>
                    <StepList fields={fieldsStep} append={appendStep} register={register} 
                              remove={removeStep} errors={errors}/>
                </div>
                <div className="add-recipe-save-container">
                    <button onClick={handleSubmit(handleRecipeSubmit, () => console.log(errors))}
                            className="btn btn-accent w-full inter-mainFont text-white" type="button">Save
                    </button>
                </div>
            </div>
        </>

    )
}

function StepList({fields, append, remove, register, errors}) {

    return (
        <>
            <div className="flex flex-col w-full mb-4">
                {errors?.Steps?.root && (
                    <p className="text-red-800" role="alert">{errors?.Steps?.root?.message}</p>
                )}

                {fields.map((item, index) => {

                    return (

                        <div className="flex items-center gap-4 mb-4" key={item.id}>
                            <div className="flex flex-col">
                                {errors?.Steps?.[index]?.step && (
                                    <p className="text-red-800" role="alert">{errors.Steps[index].step.message}</p>
                                )}
                                <input {...register(`Steps.${index}.step`, {
                                    required: "Please fill in the step", maxLength: {
                                        value: 250,
                                        message: "Step should be less than 250 characters.",
                                    }
                                })} key={item.id} type="text"
                                       className="input input-bordered w-full max-w-sm"
                                       placeholder="Step"/>
                            </div>
                            <button type="button" onClick={() => remove(index)}>
                                <svg width="53px" height="53px" viewBox="2 2 20 20" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <rect width="24" height="24" fill="white"></rect>
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M8 12C8 11.4477 8.44772 11 9 11H15C15.5523 11 16 11.4477 16 12C16 12.5523 15.5523 13 15 13H9C8.44772 13 8 12.5523 8 12ZM7.25007 2.38782C8.54878 2.0992 10.1243 2 12 2C13.8757 2 15.4512 2.0992 16.7499 2.38782C18.06 2.67897 19.1488 3.176 19.9864 4.01358C20.824 4.85116 21.321 5.94002 21.6122 7.25007C21.9008 8.54878 22 10.1243 22 12C22 13.8757 21.9008 15.4512 21.6122 16.7499C21.321 18.06 20.824 19.1488 19.9864 19.9864C19.1488 20.824 18.06 21.321 16.7499 21.6122C15.4512 21.9008 13.8757 22 12 22C10.1243 22 8.54878 21.9008 7.25007 21.6122C5.94002 21.321 4.85116 20.824 4.01358 19.9864C3.176 19.1488 2.67897 18.06 2.38782 16.7499C2.0992 15.4512 2 13.8757 2 12C2 10.1243 2.0992 8.54878 2.38782 7.25007C2.67897 5.94002 3.176 4.85116 4.01358 4.01358C4.85116 3.176 5.94002 2.67897 7.25007 2.38782Z"
                                          fill="#6D9B49"></path>
                                </g>
                            </svg>
                        </button>
                    </div>
                )
            })}

            </div>
            <div className="inter-mainFont text-3xl mb-4">
                <button className="flex " type="button" onClick={() => append({Step: ""})}>
                    <div className="flex items-center gap-3">
                        <div className=""> Add a step</div>
                        <svg width="53px" height="53px" viewBox="2 2 20 20" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                               stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <rect width="24" height="24" fill="white"></rect>
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M13 9C13 8.44772 12.5523 8 12 8C11.4477 8 11 8.44772 11 9V11H9C8.44772 11 8 11.4477 8 12C8 12.5523 8.44772 13 9 13H11V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V13H15C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11H13V9ZM7.25007 2.38782C8.54878 2.0992 10.1243 2 12 2C13.8757 2 15.4512 2.0992 16.7499 2.38782C18.06 2.67897 19.1488 3.176 19.9864 4.01358C20.824 4.85116 21.321 5.94002 21.6122 7.25007C21.9008 8.54878 22 10.1243 22 12C22 13.8757 21.9008 15.4512 21.6122 16.7499C21.321 18.06 20.824 19.1488 19.9864 19.9864C19.1488 20.824 18.06 21.321 16.7499 21.6122C15.4512 21.9008 13.8757 22 12 22C10.1243 22 8.54878 21.9008 7.25007 21.6122C5.94002 21.321 4.85116 20.824 4.01358 19.9864C3.176 19.1488 2.67897 18.06 2.38782 16.7499C2.0992 15.4512 2 13.8757 2 12C2 10.1243 2.0992 8.54878 2.38782 7.25007C2.67897 5.94002 3.176 4.85116 4.01358 4.01358C4.85116 3.176 5.94002 2.67897 7.25007 2.38782Z"
                                      fill="#6D9B49"></path>
                            </g>
                        </svg>
                    </div>
                </button>
            </div>
        </>
    )
}

function IngredientList({fields, register, append, remove, errors}) {
    return (
        <>
            <div className="flex flex-col w-full mb-4">
                {errors?.Ingredients?.root && (
                    <p className="text-red-800" role="alert">{errors?.Ingredients?.root?.message}</p>
                )}
                {fields.map((item, index) => {

                    return (

                        <div className="flex items-center gap-4 mb-4" key={item.id}>
                            <div className="flex flex-col">
                                {errors?.Ingredients?.[index]?.Name && (
                                    <p className="text-red-800" role="alert">{errors.Ingredients[index].Name.message}</p>
                                )}
                                <input {...register(`Ingredients.${index}.Name`, {required: "Please fill in the ingredient", maxLength: {
                                        value: 50,
                                        message: "Ingredient should be less than 50 characters.",
                                    }})} type="text"
                                       className="input input-bordered w-full max-w-sm"
                                       placeholder="Ingredient"/>
                            </div>
                            <div className="flex flex-col">
                                {errors?.Ingredients?.[index]?.Amount && (
                                    <p className="text-red-800" role="alert">{errors.Ingredients[index].Amount.message}</p>
                                )}
                                <div className="flex">
                                    <input {...register(`Ingredients.${index}.Amount`, {required: "Please fill in the amount", maxLength: {
                                            value: 50,
                                            message: "Ingredient amount should be less than 50 characters.",
                                        }})}
                                           type="text"
                                           className="input input-bordered w-full max-w-sm"
                                           placeholder="Amount"/>
                                </div>
                            </div>
                            <button type="button" onClick={() => remove(index)}>
                                <svg width="53px" height="53px" viewBox="2 2 20 20" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <rect width="24" height="24" fill="white"></rect>
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M8 12C8 11.4477 8.44772 11 9 11H15C15.5523 11 16 11.4477 16 12C16 12.5523 15.5523 13 15 13H9C8.44772 13 8 12.5523 8 12ZM7.25007 2.38782C8.54878 2.0992 10.1243 2 12 2C13.8757 2 15.4512 2.0992 16.7499 2.38782C18.06 2.67897 19.1488 3.176 19.9864 4.01358C20.824 4.85116 21.321 5.94002 21.6122 7.25007C21.9008 8.54878 22 10.1243 22 12C22 13.8757 21.9008 15.4512 21.6122 16.7499C21.321 18.06 20.824 19.1488 19.9864 19.9864C19.1488 20.824 18.06 21.321 16.7499 21.6122C15.4512 21.9008 13.8757 22 12 22C10.1243 22 8.54878 21.9008 7.25007 21.6122C5.94002 21.321 4.85116 20.824 4.01358 19.9864C3.176 19.1488 2.67897 18.06 2.38782 16.7499C2.0992 15.4512 2 13.8757 2 12C2 10.1243 2.0992 8.54878 2.38782 7.25007C2.67897 5.94002 3.176 4.85116 4.01358 4.01358C4.85116 3.176 5.94002 2.67897 7.25007 2.38782Z"
                                              fill="#6D9B49"></path>
                                    </g>
                                </svg>
                            </button>
                        </div>
                    )
                })}
            </div>
            <div className="inter-mainFont text-3xl mb-4">
                <button className="flex " type="button" onClick={() => append({Name: "", Amount: ""})}>
                    <div className="flex items-center gap-3">
                        <div className=""> Add an ingredient</div>
                        <svg width="53px" height="53px" viewBox="2 2 20 20" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                               stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <rect width="24" height="24" fill="white"></rect>
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M13 9C13 8.44772 12.5523 8 12 8C11.4477 8 11 8.44772 11 9V11H9C8.44772 11 8 11.4477 8 12C8 12.5523 8.44772 13 9 13H11V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V13H15C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11H13V9ZM7.25007 2.38782C8.54878 2.0992 10.1243 2 12 2C13.8757 2 15.4512 2.0992 16.7499 2.38782C18.06 2.67897 19.1488 3.176 19.9864 4.01358C20.824 4.85116 21.321 5.94002 21.6122 7.25007C21.9008 8.54878 22 10.1243 22 12C22 13.8757 21.9008 15.4512 21.6122 16.7499C21.321 18.06 20.824 19.1488 19.9864 19.9864C19.1488 20.824 18.06 21.321 16.7499 21.6122C15.4512 21.9008 13.8757 22 12 22C10.1243 22 8.54878 21.9008 7.25007 21.6122C5.94002 21.321 4.85116 20.824 4.01358 19.9864C3.176 19.1488 2.67897 18.06 2.38782 16.7499C2.0992 15.4512 2 13.8757 2 12C2 10.1243 2.0992 8.54878 2.38782 7.25007C2.67897 5.94002 3.176 4.85116 4.01358 4.01358C4.85116 3.176 5.94002 2.67897 7.25007 2.38782Z"
                                      fill="#6D9B49"></path>
                            </g>
                        </svg>
                    </div>

                </button>
            </div>
        </>
    )
}