export default function AddRecipe(){

    return (
        <div className="h-screen mx-auto w-[80%] overflow-visible mb-8">
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
                                <button className="btn btn-accent max-w-sm text-white">Upload photo</button>
                            </div>
                        </div>
                        <div className="w-full bg-white rounded-lg p-4">
                            <div className="inter-mainFont text-3xl mb-8">
                                Add steps
                            </div>
                        </div>
                    </div>
                </form>

            </div>

        </div>
    )
}