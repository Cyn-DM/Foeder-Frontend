import {useParams} from "react-router-dom";

export function Recipe() {
    const {id} = useParams();
    
    
    return (<>
            <div className="min-h-screen mx-auto w-[80%] overflow-visible mb-8 pb-16">
                <div className="flex flex-col mt-10 px-6 md:px-20 xl:px-72 inter-mainFont overflow-y-auto">
                    <div className="flex flex-col">
                        <div className="w-full">
                            <div className="flex justify-between flex-row flex-wrap-reverse gap-8 mb-8">
                                <div className="flex flex-col">
                                    <div className="inter-mainFont font-bold text-5xl mb-5">
                                        Title
                                    </div>
                                    <div className="inter-mainFont text-xl">
                                        Description
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="image-container recipe-image aspect-square mb-4">
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-full bg-white rounded-lg mb-8 p-8">
                                <div className="inter-mainFont font-bold text-lg">
                                    Ingredients
                                </div>
                            </div>
                            <div className="flex flex-col w-full bg-white rounded-lg p-8 mb-8">
                                
                            </div>
                            <div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>

    )
}