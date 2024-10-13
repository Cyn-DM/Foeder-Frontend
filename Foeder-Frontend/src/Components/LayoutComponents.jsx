import {Outlet} from "react-router-dom";
import '../mainplus.css';


export default function Root(){
    return ( 
    <>
        <Header/>
        <div className="w-full">  
          <Outlet />
        </div>
    </>
    

    )
}

function Header(){
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
              <li><a href='./recipes'>Recipes</a></li>
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
          <a href="/" className='hidden sm:flex btn btn-primary text-primary-content text-lg foederFont'>Foeder</a>
        </div>
        <div className="navbar-center">
        <a href="/" className='sm:hidden btn btn-primary text-primary-content text-lg foederFont'>Foeder</a>
          <ul className="menu menu-horizontal hidden lg:flex">
            <li><a href='./recipes' className='text-neutral-content'>Recipes</a></li> 
            <li><a className="text-neutral-content">Household</a></li>
          </ul>
        </div>
        <div className="navbar-end">
        </div>
      </div>
    )
  }
