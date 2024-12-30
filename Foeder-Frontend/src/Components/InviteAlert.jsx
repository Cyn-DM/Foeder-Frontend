import {Link} from "react-router-dom";

export default function InviteAlert(){

    return (
        <>
            <div className="mr-2">
                <h3 className="font-bold">New invite!</h3>
                <div className="text-xs">You have new household invite(s).</div>
            </div>
            <Link to="/invites"
                  className="btn btn-white shadow-lg btn-main btn-sm flex-none px-4 text-black inter-mainFont">Show</Link>
        </>

    )
}

