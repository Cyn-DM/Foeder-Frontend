import "../mainplus.css";
import {GoogleAuth} from "../Authentication/GoogleAuth.jsx";
import apples from '../../public/img/apples.png';


export default function IndexPage(){
    return (
            <div className="relative overflow-hidden h-[100vh]">
                <div className="mx-auto grid grid-cols-12 gap-5 px-6 md:px-8">
                    <div className="col-span-12 md:col-span-3 z-[1] ">
                        <p className="inter-mainFont font-bold text-5xl pt-8">
                            Recipe and pantry stock-keeping
                        </p>
                        <p className="inter-mainFont text-xl pt-8">
                            It’s easy to get started with Foeder. Just create an account by signing up with your google
                            account.
                        </p>
                        <div className="py-8">
                            <GoogleAuth/>
                        </div>
                    </div>
                </div>
                <img className="hidden md:flex absolute apples-img"
                     src={apples}
                     alt="Apples"/>
            </div>

    )
}
