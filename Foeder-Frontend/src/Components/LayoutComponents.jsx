import {Link, Outlet} from "react-router-dom";
import '../mainplus.css';
import {GoogleAuth} from "../Authentication/GoogleAuth"
import {AuthProvider, UseAuth} from "../Authentication/AuthProvider.jsx";
import {AuthLink} from "../Routing/AuthLink.jsx";


export default function Root(){
    return ( 
    <>
        <AuthProvider>
            <Header/>
            <div className="w-full">
                <Outlet />
            </div>
        </AuthProvider>
    </>
    

    )
}

function Header(){
    const {isAuthenticated} = UseAuth();
    return (
      <div className="navbar bg-neutral flex ">
        <div className="navbar-start">
            <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#DBD6CA">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-neutral text-neutral-content rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li><AuthLink url={'./recipes'} isAuthenticated={isAuthenticated} name={'Recipes'} /></li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </li>
              <li><a>Item 3</a></li>
            </ul>
          </div>
          <Link to="/" className='hidden sm:flex btn btn-primary text-primary-content text-lg foederFont'>Foeder</Link>
        </div>
        <div className="navbar-center">
        <Link to="/" className='sm:hidden btn btn-primary text-primary-content text-lg foederFont'>Foeder</Link>
          <ul className="menu menu-horizontal hidden lg:flex">
            <li className="text-neutral-content"><AuthLink url={'./recipes'} isAuthenticated={isAuthenticated} name={'Recipes'} /></li>
            <li className="text-neutral-content"><Link to="./create-household" >Household</Link></li>
          </ul>
        </div>
        <div className="navbar-end">
          <GoogleAuth />
        </div>
      </div>
    )
  }
