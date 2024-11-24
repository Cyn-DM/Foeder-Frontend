import {Link, Outlet} from "react-router-dom";
import '../mainplus.css';
import {GoogleAuth} from "../Authentication/GoogleAuth"
import {AuthProvider, UseAuth} from "../Authentication/AuthProvider.jsx";
import {AuthLink} from "../Routing/AuthLink.jsx";


export default function Root(){
    return ( 
    <>
        <AuthProvider>
            <div className="h-[100vh] overflow-hidden">
                <Header/>
                <div className="w-full full-screen-container">
                    <Outlet />
                </div>
            </div>
        </AuthProvider>
    </>
    

    )
}

function Header(){
    const {isAuthenticated} = UseAuth();
    return (
      <div className="navbar bg-base0100 min-h-0 h-12">
        <div className="navbar-start md:mr-4 ">
            <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-accent btn-sm lg:hidden">
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
              className="menu menu-sm dropdown-content bg-neutral text-neutral-content rounded-box z-[2] mt-3 w-52 p-2 shadow">
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
          <Link to="/" className='hidden lg:flex btn btn-sm btn-accent text-base-100 text-lg foederFont'>Foeder</Link>
        </div>
        <div className="navbar-center">
        <Link to="/" className='text-sm lg:hidden btn btn-accent btn-xs text-base-100 foederFont lg:text-xl'>Foeder</Link>
          <ul className="menu menu-horizontal hidden lg:flex">
            <li className="text-black inter-mainFont font-medium text-lg"><AuthLink url={'./recipes'} isAuthenticated={isAuthenticated} name={'Recipes'} /></li>
            <li className="text-black inter-mainFont font-medium text-lg"><Link to="" >Household</Link></li>
          </ul>
        </div>
        <div className="navbar-end">

        </div>
      </div>
    )
  }
