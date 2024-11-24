import {UseAuth} from "../Authentication/AuthProvider.jsx";
import {useEffect, useState} from "react";
import {ContentWrapper} from "./LayoutComponents.jsx";

export default function Household(){
    const {user, axiosInstance} = UseAuth();
    const [household, setHousehold] = useState(null);

    useEffect(() => {
        GetHousehold();
    }, [])

    const GetHousehold = () => {
        axiosInstance.get('/Household', {userId: user.id})
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
                        Household
                    </div>
                    <HouseholdName name={"Please create or join a household."}/>
                </div>
            </ContentWrapper>


        )
    }

    return (
        <ContentWrapper>
            <div className="col-span-12 md:col-span-6">
                <div className="inter-mainFont font-bold text-5xl">
                    Household
                </div>
                <HouseholdName name={household.Name}/>
            </div>
        </ContentWrapper>
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