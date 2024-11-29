import {UseAuth} from "../Authentication/AuthProvider.jsx";
import {useEffect, useState} from "react";
import {ContentWrapper} from "./LayoutComponents.jsx";
import {Link} from "react-router-dom";

export default function Household(){
    const {user, axiosInstance} = UseAuth();
    const [household, setHousehold] = useState(null);

    useEffect(() => {
        GetHousehold();
    }, [])

    const GetHousehold = () => {
        console.log(user);
        const userId = user.id;
        axiosInstance.get(`/Household/GetHouseholdByUser?userId=${userId}` )
            .then((response) => {
                setHousehold(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    if (household === null){
        return (
            <ContentWrapper>
                <div className="col-span-12 md:col-span-6">
                    <div className="inter-mainFont font-bold text-5xl">
                        Household overview page
                    </div>
                    <HouseholdName name={"Please create or join a household."}/>
                    <Link to="/create-household" className="btn btn-accent shadow-lg btn-main btn-sm flex-none px-4 mt-3 text-white inter-mainFont">Create a household</Link>
                </div>
            </ContentWrapper>


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
                <div>
                    <button className="btn btn-accent">Invite user</button>
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