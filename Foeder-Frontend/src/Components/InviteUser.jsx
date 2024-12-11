import {UseAuth} from "../Authentication/AuthProvider.jsx";
import {useState} from "react";
import SuccessAlert from "./SuccessAlert.jsx";

export default function InviteUser() {
    const {household, axiosInstance} = UseAuth();
    const [labelText, setLabelText] = useState("");
    const [successMessage, setSuccessMessage] = useState(null);

    const submitInvite = () => {
        const input = document.getElementById("emailInput").value;

        if (input.trim() === ""){
            setLabelText("Please fill in an email.")
        } else{
            let invite  = {email: input, householdId: household.id }

            axiosInstance.post(`/HouseholdInvite/PostHouseholdInvite`, invite )
                .then((response) => {
                    if (response.status === 200){
                        setSuccessMessage("You have successfully invited a user.");
                    }
                    setTimeout(() => {
                        setSuccessMessage(null);
                    }, 5000)
                })
                .catch((error) => {
                    if (error.response){
                        setSuccessMessage("User was not found.");

                        setTimeout(() => {
                            setSuccessMessage(null);
                        }, 5000)
                    }
                    console.log(error);
                })
        }

    }

    return (
        <div className="grid grid-cols-12 mx-auto mt-8 px-6 md:px-20 xl:px-72 gap-5">
            <div className="col-span-12">
                <div className="inter-mainFont font-bold text-5xl">
                    Invite someone to your household
                </div>

            </div>
            <div className="col-span-12">
                <SuccessAlert successMessage={successMessage} />
            </div>
            <div className="col-span-12 flex flex-wrap gap-5">
                <div className="w-72 md:w-96 ">
                    <label className="input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
                            <path
                                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"/>
                        </svg>
                        <input type="text" className="grow" placeholder="Email" id="emailInput"/>
                    </label>
                </div>
                <div>
                    <button onClick={submitInvite} type="button" className="btn btn-accent">Submit</button>
                </div>
            </div>

        </div>
    )
}

