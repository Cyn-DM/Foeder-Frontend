import { useEffect, useState } from "react";
import  axios  from "axios";

export function GoogleAuth(){
    const [scriptLoaded, setScriptLoaded] = useState(false);

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

            const button = document.getElementById('signInDiv');
            google.accounts.id.renderButton(button, {size:'medium', text:'signin', shape:'pill', theme:'filled_black'});
            google.accounts.id.prompt();
        }
    }, [scriptLoaded]);
    
    const handleCredentialResponse = (response) => {
        axios.post('https://localhost:7058/api/Auth', 
            {CredentialResponse: response.credential}
        ).then((response) => console.log(response)).catch(error => console.error('Connection error:', error));
    }

    return (
    <>
        <div id='signInDiv'></div>
    </>)
}



