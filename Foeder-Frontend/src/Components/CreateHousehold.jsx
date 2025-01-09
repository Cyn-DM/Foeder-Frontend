import { UseContext } from "../Authentication/ContextProvider.jsx"
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export function CreateHousehold() {
    const { axiosInstance, setUserRefresh } = UseContext();
    const [labelText, setLabelText] = useState("")
    const navigate = useNavigate();
    function handleClick(){
        const input = document.getElementById("householdInput").value;

        if (input.trim() === ""){
            setLabelText("Please fill in a household name.")
        } else
        if (input.length > 50) {
            setLabelText("Please enter a household name less than 50 characters.")
        } else {
            axiosInstance.post('/Household/AddHousehold', { Name: input })
                .then((response) => {
                    if (response.status === 200){
                        navigate('/Household');
                        setUserRefresh(true);
                    }
                })
                .catch((error) => {
                    if (error.response.status === 400) {
                        if (error.response.data.errors?.Name !== undefined){
                            const errors = error.response.data.errors.Name;
                            setLabelText(errors.join('\n'));
                        } else {
                            setLabelText(error.response.data);
                        }
                    }
                })
        }



    }


    return (
        <div className="grid grid-cols-12 mx-auto mt-10 px-6 md:px-20 xl:px-72 gap-0">
            <div className="col-span-12 mx-auto md:col-span-6 card w-72 md:w-96 shadow-xl bg-base-100">
                <div className="card-body">
                    <div className="card-title inter-mainFont">
                        Create your household
                    </div>
                    <div className="col-span-12 flex flex-wrap gap-5">
                        <div className="w-72 md:w-96 ">
                            <div className="label">
                                <div className='label-text md:text-xl'>Household name</div>
                            </div>
                            <input type='text' placeholder='Household name'
                                   className='input input-bordered w-full max-w-xs md:input-lg inter-mainFont' id="householdInput"/>
                            <button onClick={handleClick} type="button"
                                    className='btn btn-accent shadow-md btn-block text-white inter-mainFont mt-6'>Save
                            </button>
                            <label className="warning-label w-full max-w-xs whitespace-pre-wrap">{labelText}</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-12 md:col-span-6 mx-auto card mt-8 md:mt-0 w-72 md:w-[500px] shadow-xl bg-base-100">
                <div className="card-body">
                    <div className="card-title inter-mainFont">
                        Why create a household?
                    </div>
                    <div className="inter-mainFont">
                        <p>Once you&#39;ve created a household, you can add members.
                            Foeder allows you to share recipes, as well as vote on what to eat.</p>
                        <p>
                            You can always change your household name later on and invite or remove members.
                            All you need to add someone is the email-address they&#39;ve created their account with.
                        </p>
                    </div>
                </div>
            </div>


        </div>

    )
}
