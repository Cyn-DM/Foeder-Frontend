import "../mainplus.css";
import {GoogleAuth} from "../Authentication/GoogleAuth.jsx";
import apples from '../img/apples.png';


export default function IndexPage(){
    return (
        <div className=" mx-auto grid grid-cols-12 gap-5 px-6 md:px-8">
            <div className="col-span-12 md:col-span-3">
                <p className="inter-mainFont font-bold text-5xl pt-8">
                    Recipe and pantry stock-keeping
                </p>
                <p className="inter-mainFont text-xl pt-8">
                    It’s easy to get started with Foeder. Just create an account by signing up with your google account.
                </p>
                <div className="py-8">
                    <GoogleAuth/>
                </div>
            </div>
            <div className="relative col-span-12 md:col-span-7">
                <img className="absolute right-[-45%] top-[20%] scale-[190%] md:scale-[250%] lg:scale-[200%] z-[0]" src={apples} alt="Apples"/>
            </div>
        </div>
    )
}
