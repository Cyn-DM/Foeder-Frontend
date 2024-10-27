import { useEffect, useState } from "react";
import  axios  from "axios";
import {UseAuth} from "./AuthProvider.jsx";
import {jwtDecode} from "jwt-decode";
import {element} from "prop-types";


export function GoogleAuth(){
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const {login, isAuthenticated} = UseAuth();


    useEffect(() => {
        const script = document.createElement('script');

        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.onload = () => {
            setScriptLoaded(true);
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, [setScriptLoaded]);
    
    useEffect(() => {
        if(scriptLoaded){
            window.google.accounts.id.initialize({
                client_id: '367820938286-u0u38i2711n088ttaikh6s6td31pegjd.apps.googleusercontent.com',
                callback: handleCredentialResponse,
                ux_mode: 'popup',
            });

            const container = document.getElementById('signInContainer');

            if (!isAuthenticated){
                const element = document.createElement('div');
                element.setAttribute('id', 'signInDiv');
                const button = container.appendChild(element);
                // eslint-disable-next-line no-undef
                google.accounts.id.renderButton(button, {size:'medium', text:'signin', shape:'pill', theme:'filled_black'});
                // eslint-disable-next-line no-undef
                google.accounts.id.prompt();
            }

            if (isAuthenticated){
                const button = document.getElementById('signInDiv');
                if (button){
                    container.removeChild(button);
                }
            }
        }
    }, [scriptLoaded, isAuthenticated]);

    axios.defaults.withCredentials = true;

    const handleCredentialResponse = (response) => {
        axios.post('https://localhost:7058/api/Auth/login',
            {CredentialResponse: response.credential}
        ).then((response) => {
            let accessToken = response.data;
            axios.defaults.baseURL = 'https://localhost:7058/api/';
            axios.defaults.headers.common['Authorization'] =  `Bearer ${accessToken}`
            let userInfo = jwtDecode(accessToken);

            const user = { "name" : userInfo.unique_name,
                "email" : userInfo.email,
                "householdId" : userInfo.HouseholdId ?? undefined,
            }
            login(user);

        }).catch(error => console.error('Connection error:', error));
    }

    return (
    <>
        <div id='signInContainer'>

        </div>
    </>)
}



