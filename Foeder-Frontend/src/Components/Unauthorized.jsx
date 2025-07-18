import {Link} from "react-router-dom";

export function Unauthorized() {
    return (
        <div className='lg:border lg:border-gray-300 mt-8 p-6 max-w-3xl xl:max-w-4xl 2xl:max-w-7xl mx-auto text-center'>
            <h1 className='text-2xl'>Unauthorized</h1>
            <p>Please log in again.</p>
            <Link to={'/'}><button className="btn btn-lg btn-accent text-white mt-6">Return to login</button></Link>
        </div>
    )


}