import {createContext, useContext, useState} from "react";
import PropTypes from 'prop-types';
import axios from "axios";
const ContextProv = createContext(null)

export function ContextProvider({children})
{
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [household, setHousehold] = useState(null);
    const [invites, setInvites] = useState(null);
    const [hasInvites, setHasInvites] = useState(false);
    const [loading, setLoading] = useState(true);

    const refreshForRouter = () => {
        
}
    

    let docker = false;
    docker = Boolean(import.meta.env.VITE_DOCKER);
    let backendUrl;
    if (docker) {
        backendUrl =  'https://backend:7058/api';
    } else {
        backendUrl =  'https://localhost:7058/api';
    }
    const axiosInstance = axios.create({
        baseURL: backendUrl,
        withCredentials: true,
    });

    ContextProvider.propTypes = {
        children: PropTypes.any
    }

    return (
        <ContextProv.Provider value={{
            setUser,
            setIsAuthenticated,
            isAuthenticated,
            user, 
            household,
            setHousehold,
            backendUrl,
            axiosInstance,
            invites, 
            setInvites,
            hasInvites,
            setHasInvites,
            loading, 
            setLoading, 
        }}>
            {children}
        </ContextProv.Provider>
    );
}

export function UseContext(){
    return useContext(ContextProv);
}



