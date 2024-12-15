export default function AddRecipe(){

    return (
        <>
            <div className="flex flex-col mt-10 px-6 md:px-20 xl:px-72">
                <div className="inter-mainFont text-5xl mb-8">
                    Add a recipe
                </div>
                <form className="form-control flex flex-col">
                    <div className="flex">
                        <label htmlFor="title">Title</label>
                    </div>
                    <input type="text"
                           id="title"
                           name="title"
                           className="input input-bordered w-full max-w-sm"
                           placeholder="Title"
                    />
                    <div className="flex">
                        <label htmlFor="description">Title</label>
                    </div>
                    <textarea
                           id="title"
                           name="title"
                           className="textarea textarea-bordered textarea-md"
                           placeholder="Title"
                    />
                </form>
            </div>

        </>
    )
}