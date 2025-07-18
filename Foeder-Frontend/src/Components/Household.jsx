import {UseContext} from "../Authentication/ContextProvider.jsx";
import {useEffect} from "react";
import { Link, useNavigation} from "react-router-dom";
import InviteAlert from "./InviteAlert.jsx";
import {Bounce, toast, ToastContainer} from "react-toastify";
import {UseAuth} from "../Authentication/AuthProvider.jsx";

export default function Household(){
    const { household, hasInvites, setHousehold, user, axiosInstance} = UseContext();
    const { GetHousehold, GetInvites } = UseAuth();
    const nav = useNavigation();

    useEffect(() => {
        GetInvites().then(() => {
                if (hasInvites === true) {
                toast.info(<InviteAlert/>, {autoClose: false, closeButton: true})
                }
            }
        )
            .catch((error) => {
                toast.error(error);
            });
        GetHousehold();
        
        
    }, [])

    function handleLeave(){
        axiosInstance.delete(`/Household/LeaveHousehold?userId=${user.id}`).then((response) => {
            if (response.status === 200){
                setHousehold(null);

                toast.success("You have successfully left the household.", {onClose: () => nav('/household')});
            }
        })
            .catch((error) => {
                toast.error(error.message)
            })
    }


    if (household === null){
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
                <div className="grid grid-cols-12 mx-auto mt-8 px-6 md:px-20 xl:px-72 gap-5">
                    <div className="col-span-12 md:col-span-6">
                        <div className="inter-mainFont font-bold text-5xl">
                            Household overview page
                        </div>
                        <div className="col-span-12 flex flex-wrap gap-5">
                            <HouseholdName name={"Please create or join a household."}/>
                            <Link to="/create-household"
                                  className="btn btn-accent shadow-lg btn-main btn-sm flex-none px-4 mt-3 text-white inter-mainFont">Create
                                a household</Link>
                        </div>
                    </div>
                </div>
            </>


        )
    }

    return (
        <div className="grid grid-cols-12 mx-auto mt-8 px-6 md:px-20 xl:px-72 gap-5">
            <div className="col-span-12">
                <div className="inter-mainFont font-bold text-5xl">
                    Household overview page
                </div>
                <HouseholdName name={household.name}/>
            </div>
            <div className="col-span-12 flex flex-wrap gap-5">
                <div className="w-72 md:w-96 ">
                    <HouseholdUsers users={household.users}/>
                </div>
                <div className="flex flex-col gap-5">
                    <Link to={'/invite-user'} className="btn btn-accent inter-mainFont">Invite user</Link>
                    <button onClick={handleLeave} className="btn btn-error inter-mainFont">Leave</button>
                </div>
            </div>

        </div>


    )
}

function HouseholdName({name}) {
    if (name === undefined) {
        return <></>
    }
    if (name) {
        return (
            <div className="inter-mainFont mt-4 font-bold text-xl">
                {name}
            </div>
        )
    }
}

function HouseholdUsers({users}) {
    if (users === undefined) {
        return <></>
    }

    if (users) {
        return <div className="card bg-base-100 w-full shadow-xl">
            <div className="card-body">
                {users.map((user) => (
                    <UserAccordionItem key={user.id} firstName={user.firstName} lastName={user.lastName} email={user.email}/>
                ))}
            </div>
        </div>
    }
}

function UserAccordionItem({firstName, lastName, email}) {
    return (
        <div className="collapse collapse-arrow bg-base-200">
            <input type="checkbox" name="my-accordion-2"/>
            <div className="collapse-title text-xl font-medium">{firstName} {lastName}</div>
            <div className="collapse-content">
                <p>Email: {email}</p>
            </div>
        </div>
    )
}