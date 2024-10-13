import "../mainplus.css";


export default function IndexPage(){
    return (
        <div className="flex flex-col">
            <div className='flex justify-center bg-secondary py-20'>
                <div className="bg-base-100 p-8 rounded-md text-center">
                    <div className='foederFont text-neutral text-7xl md:text-9xl'>
                        Foeder
                    </div>
                </div>
            </div>
            <div className="w-1/2 mx-auto flex mt-10 justify-center bg-secondary text-secondary-content rounded-md p-8 text-center">
                <p>Welcome to foeder, your personal recipe and pantry keeper!</p>
            </div>
        </div>
    )
}