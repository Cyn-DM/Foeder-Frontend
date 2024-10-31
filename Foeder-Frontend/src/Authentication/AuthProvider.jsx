import {createContext, useContext, useState} from "react";
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import {jwtDecode} from "jwt-decode";
const AuthContext = createContext(null)

export function AuthProvider({children})
{   
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Add a request interceptor
    axios.interceptors.request.use((axiosConfig) =>{
        axiosConfig.baseURL =  'https://localhost:7058/api';
        let accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            login(createUser(accessToken))
            axios.defaults.withCredentials = true;
            axiosConfig.headers.common['Authorization'] = localStorage.getItem('access_token');
        }
        if (!accessToken) {
            logout()
        }
    }
 )

    AuthProvider.propTypes = {
        children: PropTypes.any
    }

    const createUser = (accessToken) => {
        let userInfo = jwtDecode(accessToken);

        return { "name" : userInfo.unique_name,
            "email" : userInfo.email,
            "householdId" : userInfo.HouseholdId ?? undefined,
        }
    }
    const login = (user) => {
    setUser(user);
    setIsAuthenticated(true);
}
    const clearAccessToken = () => {
        if (localStorage.getItem('access_token')) {
            localStorage.removeItem("accessToken");
        }
    }

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        clearAccessToken();
    }

    const getAccessToken = () => {
        return localStorage.getItem('access_token');
    }

    const setAccessTokenLocalStorage = (accessToken) => {
        if (localStorage.getItem('access_token')) {
            localStorage.removeItem('access_token');
        }
        localStorage.setItem('access_token', `Bearer ${accessToken}`);
    }

    const setAccessTokenFromRefresh = () => {
        axios.get("/Auth/refresh").then((response) => {
            setAccessTokenLocalStorage(response.data);
        })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    logout()
                    navigate('/unauthorized');
                }
            })
    }

    const handleCredentialResponse = (response) => {
        axios.post('/Auth/login',
            {CredentialResponse: response.credential}
        ).then((response) => {
            setAccessTokenLocalStorage(response.data)
            createUser(response.data);
            login(user);
        }).catch(error => console.error('Connection error:', error));
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated,
            user,
            createUser,
            login,
            logout,
            getAccessToken,
            setAccessToken: setAccessTokenFromRefresh,
            handleCredentialResponse
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function UseAuth(){
    return useContext(AuthContext);
}



