import {UseContext} from "../Authentication/ContextProvider.jsx";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Bounce, toast, ToastContainer} from "react-toastify";
import {UseAuth} from "../Authentication/AuthProvider.jsx";

export default function Invites(){
    const { invites, hasInvites} = UseContext();
    const { GetInvites } = UseAuth();
 



    useEffect(() => {
        GetInvites();
    }, [])

    if (hasInvites === null || hasInvites === false)
    return (
         <div>
             There are no invites to display.
         </div>
    )

    return (
        <>
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
            <div className="flex flex-col mx-auto gap-5 px-6 xl:px-96 p-6 mb-8">
                <h1 className="inter-mainFont font-bold text-4xl">
                    Invitations
                </h1>
                {
                    invites.map((invite) => (
                        <InviteCard key={invite.id} invite={invite} toastTrigger={toast.error} toastTriggerSuccess={toast.success} />
                    ))
                }
            </div>
        </>
       


    )
}

function InviteCard ({invite, toastTriggerError, toastTriggerSuccess}){
    const {axiosInstance} = UseContext();
    const navigate = useNavigate();

    const handleInviteResponse = (inviteId, isAccepted) => {
        const invite =
            {
                id:  inviteId,
                isAccepted: isAccepted,
            }

        axiosInstance.post("/HouseholdInvite/RespondToHouseholdInvite", invite).then((response) => {
            if(response.status === 200){
                if (invite.isAccepted === true){
                    toastTriggerSuccess("Successfully accepted invite.", {onClose: () => navigate("/household")})
                }
                if (invite.isAccepted === false){
                    toastTriggerSuccess("Successfully denied invite.", {onClose: () => navigate("/household")})
                }
                
            }
        })
            .catch((error) => {
                toastTriggerError(error.message);
            })
    }

    if (invite.isAccepted !== null) {
        return <></>
    }


    return (
        <div key={invite.id} className="card bg-base-100 w-72 shadow-xl">
            <div className="card-body">
                <div className="card-title inter-mainFont">
                    {invite.household.name} has invited you.
                </div>
                <button onClick={() => handleInviteResponse(invite.id, true)}
                        className="btn btn-accent text-white inter-mainFont">
                    Accept
                </button>
                <button onClick={() => handleInviteResponse(invite.id, false)}
                        className="btn btn-error inter-mainFont text-white">
                    Reject
                </button>
            </div>
        </div>

    )
}
