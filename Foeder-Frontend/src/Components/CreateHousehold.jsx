import { UseAuth } from "../Authentication/AuthProvider.jsx"
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export function CreateHousehold() {
    const { axiosInstance } = UseAuth();
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
        <div className='lg:border lg:border-gray-300 pl-6 pr-6 pb-6 lg:mt-6 md:max-w-3xl lg:max-w-4xl 2xl:max-w-7xl mx-auto'>
            <div className='w-[calc(100%+3rem)] h-14 bg-secondary -ml-6 flex items-center justify-center'>
                <p className='text-center align-middle text-secondary-content text-2xl md:text-4xl'>Create a household</p>
            </div>
            <div className='flex items-center justify-center'>
                <div className="form-control mt-8 mb-8">
                    <div className="label">
                        <div className='label-text md:text-xl'>Household name</div>
                    </div>
                    <input type='text' placeholder='Household name' className='input input-bordered w-full max-w-xs md:input-lg' id="householdInput"/>
                    <button onClick={handleClick} type="button" className='btn btn-secondary btn-block  mt-6'>Submit</button>
                    <label className="warning-label w-full max-w-xs whitespace-pre-wrap">{labelText}</label>
                </div>
            </div>
        </div>
    )
}
