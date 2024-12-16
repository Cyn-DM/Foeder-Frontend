import {useState} from "react";

export default function AddRecipe(){
    const [stepCount, setStepCount] = useState(0);

    const handleCountIncrease = () => setStepCount((prev) => prev + 1);
    const handleCountDecrease = () => setStepCount((prev) => Math.max(prev - 1, 0));


    return (
        <div className="min-h-screen mx-auto w-[80%] overflow-visible mb-8 pb-16">
            <div className="flex flex-col mt-10 px-6 md:px-20 xl:px-72 inter-mainFont overflow-y-auto">
                <div className="inter-mainFont text-5xl mb-8">
                    Add a recipe
                </div>
                <form className="form-control flex flex-col">
                    <div className="w-fit">
                        <div className="flex flex-row flex-wrap-reverse gap-8 mb-8">
                            <div className="flex flex-col">
                                <div className="flex">
                                    <label htmlFor="title">Title</label>
                                </div>
                                <input type="text"
                                       id="title"
                                       name="title"
                                       className="input input-bordered w-full max-w-sm mb-3"
                                       placeholder="Title"
                                />
                                <div className="flex">
                                    <label htmlFor="description">Description</label>
                                </div>
                                <textarea
                                    id="description"
                                    name="description"
                                    className="textarea textarea-bordered textarea-md max-w-sm"
                                    placeholder="Description"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="image">Image</label>
                                <div className="image-container max-w-sm aspect-square mb-4">
                                </div>
                                <input type="file"
                                       className="file-input file-input-bordered file-input-accent w-full max-w-xs mb-4"/>
                                <button type="button" className="btn btn-accent max-w-sm text-white">Upload photo</button>
                            </div>
                        </div>
                        <div className="flex flex-col w-full bg-white rounded-lg p-4">
                            <div className="inter-mainFont text-3xl mb-4">
                                <button className="flex " type="button" onClick={handleCountIncrease}>
                                    <div className="flex items-center gap-3">
                                        <div className=""> Add a step </div>
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
                            <div className="flex flex-col w-full">
                                <StepList stepCount={stepCount} handleCountDecrease={handleCountDecrease} handleCountIncrease={handleCountIncrease} />
                            </div>

                        </div>
                    </div>
                </form>

            </div>

        </div>
    )
}

function StepList({stepCount, handleCountIncrease, handleCountDecrease}) {
    return (
        <>
            {Array.from({length: stepCount}).map((_, index) => {
                const keyword = "step" + index;

                return (

                    <div className="flex items-center gap-4" key={keyword}>
                        <input key={keyword} id={keyword} type="text"
                               className="input input-bordered w-full max-w-sm"
                               placeholder="Step"/>
                        <button type="button" onClick={handleCountDecrease}>
                            <svg width="53px" height="53px" viewBox="2 2 20 20" fill="none"
                                 xmlns="http://www.w3.org/2000/svg" >
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
        </>
    )
}