export function CreateHousehold() {
    
    function handleClick(){

    }


    return (
        <div className='lg:border lg:border-gray-300 pl-6 pr-6 pb-6 lg:mt-6 md:max-w-3xl lg:max-w-4xl 2xl:max-w-7xl mx-auto'>
            <div className='w-[calc(100%+3rem)] h-14 bg-secondary -ml-6 flex items-center justify-center'>
                <p className='text-center align-middle text-secondary-content text-2xl md:text-4xl'>Create a household</p>
            </div>
            <div className='flex items-center justify-center'>
                <div className="form-control mt-8 mb-8">
                    <div className="label">
                        <div className='label-text md:text-xl'>Household name</div>
                    </div>
                    <input type='text' placeholder='Household name' className='input input-bordered w-full max-w-xs md:input-lg'/>
                    <button onClick={handleClick} type='submit' className='btn btn-secondary btn-block  mt-6'>Submit</button>
                </div>
            </div>
        </div>
    )
}
