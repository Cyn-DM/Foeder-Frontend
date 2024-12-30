import { useEffect, useState } from "react";
import  axios  from "axios";
import {UseContext} from "./ContextProvider.jsx";
import {UseAuth} from "./AuthProvider.jsx";

export function GoogleAuth(){
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const {isAuthenticated} = UseContext();
    const { handleCredentialResponse } = UseAuth();
    


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
    }, []);
    
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
                google.accounts.id.renderButton(button, {size:'large', text:'signin', shape:'pill', theme:'filled_black'});
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





    return (
    <>
        <div id='signInContainer' className='z-[1]'>

        </div>
    </>)
}



