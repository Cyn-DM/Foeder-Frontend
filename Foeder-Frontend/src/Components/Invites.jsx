import {UseAuth} from "../Authentication/AuthProvider.jsx";
import {useEffect, useState} from "react";

export default function Invites(){
    const { invites, GetInvites, hasInvites} = UseAuth();
    const [reload, setReload] = useState(false);

    const reloadComponent = () => {
        setReload(prevReload => !prevReload);
    }


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
        <div className="flex flex-col mx-auto gap-5 px-6 xl:px-96 p-6 mb-8">
            <h1 className="inter-mainFont font-bold text-4xl">
                Invitations
            </h1>
            {
                invites.map((invite) => (
                    <InviteCard key={invite.id} invite={invite} />
                ))
            }
        </div>


    )
}

function InviteCard ({invite}){
    const {axiosInstance} = UseAuth();

    const handleInviteResponse = (inviteId, isAccepted) => {
        const invite =
            {
                id:  inviteId,
                isAccepted: isAccepted,
            }

        axiosInstance.post("/HouseholdInvite/RespondToHouseholdInvite", invite).then((response) => {
            console.log(response.data);

        })
            .catch((error) => {
                console.log(error);
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
