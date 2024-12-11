import {Link} from "react-router-dom";

export default function InviteAlert({hasInvites}){

    if (!hasInvites){
       return <></>
    }

    return (
        <div className="alert bg-accent text-white shadow-lg max-w-3xl " role="alert">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current h-6 w-6 shrink-0">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
                <h3 className="font-bold">New invite!</h3>
                <div className="text-xs">You have new household invite(s).</div>
            </div>
            <Link to="/invites" className="btn btn-white shadow-lg btn-main btn-sm flex-none px-4 mt-3 text-black inter-mainFont">Show</Link>
        </div>
    )
}

