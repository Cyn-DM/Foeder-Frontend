import { useEffect, useState } from "react";


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
    }, []);
    

    return (
    <>
        <div id="g_id_onload"
            data-client_id="367820938286-u0u38i2711n088ttaikh6s6td31pegjd.apps.googleusercontent.com"
            data-context="signin"
            data-ux_mode="popup"
            data-login_uri="https://localhost:7058/api/Auth"
            data-auto_select="true"
            data-itp_support="true">
        </div>

        <div className="g_id_signin bg-inherit"
            data-type="standard"
            data-shape="pill"
            data-theme="outline"
            data-text="signin_with"
            data-size="medium"
            data-logo_alignment="left">
        </div>
</>)
}


