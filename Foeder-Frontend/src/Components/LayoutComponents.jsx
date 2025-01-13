import {Link, Outlet} from "react-router-dom";
import '../mainplus.css';
import { UseContext} from "../Authentication/ContextProvider.jsx";
import {AuthLink, HouseholdWrapper} from "../Routing/AuthLink.jsx";
import {AuthProvider, UseAuth} from "../Authentication/AuthProvider.jsx";
import {Bounce, toast, ToastContainer} from "react-toastify";
import {useEffect} from "react";


export default function Root(){
    return (
        <AuthProvider>
            <InviteToast/>
            <div className="h-[100vh] overflow-hidden">
                <Header/>
                <div className="w-full full-screen-container">
                    <Outlet/>
                </div>
            </div>
        </AuthProvider>
    )
}

function Header() {
    const {isAuthenticated, household} = UseContext();


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
                    <li><HouseholdWrapper household={household} element={<AuthLink url={'./recipes'} isAuthenticated={isAuthenticated} name={'Recipes'}/>}/></li>
                    <li><AuthLink url={"./household"} isAuthenticated={isAuthenticated} name={'Household'}/></li>
                </ul>
            </div>
            <Link to="/" className='hidden lg:flex btn btn-sm btn-accent text-base-100 text-lg foederFont'>Foeder</Link>
        </div>
          <div className="navbar-center">
        <Link to="/" className='text-sm lg:hidden btn btn-accent btn-xs text-base-100 foederFont lg:text-xl'>Foeder</Link>
          <ul className="menu menu-horizontal hidden lg:flex">
            <li className="text-black inter-mainFont font-medium text-lg"><HouseholdWrapper household={household} element={<AuthLink url={'./recipes'} isAuthenticated={isAuthenticated} name={'Recipes'}/>}/></li>
              <li className="text-black inter-mainFont font-medium text-lg"><AuthLink url={"./household"} isAuthenticated={isAuthenticated} name={'Household'} /></li>
          </ul>
        </div>
        <div className="navbar-end">
            <LogoutButton isAuthenticated={isAuthenticated}/>
        </div>
      </div>
    )
  }

  export function LogoutButton({isAuthenticated}){
    const {logout} = UseAuth();

    const handleLogout = () => {
          logout();
    }

    if (isAuthenticated) return (
        <button onClick={handleLogout} className="btn btn-sm btn-accent text-white inter-mainFont">Log out</button>
    )
      return (
        <></>
    )
  }

export function ContentWrapper({children}) {
    return (
        <div className="mx-auto flex gap-5 px-6 xl:px-96 mt-8">
            {children}
        </div>
    )
  }

  function InviteToast() {
      const {inviteNotification} = UseAuth();

      useEffect(() => {
          if (inviteNotification){
              toast.info(inviteNotification);
          }
      }, [inviteNotification])
      
    return (
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
        />
    )
  }