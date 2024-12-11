import {createContext, useContext, useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {Navigate, useNavigate} from 'react-router-dom';
import axios from "axios";
import {jwtDecode} from "jwt-decode";
const AuthContext = createContext(null)

export function AuthProvider({children})
{
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [household, setHousehold] = useState(null);
    const [invites, setInvites] = useState(null);
    const [hasInvites, setHasInvites] = useState(false);
    const navigator = useNavigate();
    const [reload, setReload] = useState(false);

    const reloadComponent = () => {
        setReload(prevReload => !prevReload);
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

    useEffect(() => {
        setAccessTokenFromRefresh()
    }, [])

    useEffect(() => {
        if (user !== null){
            GetHousehold();
            GetInvites();
        }
    }, [user])

    const GetHousehold = () => {
        const userId = user.id;
        axiosInstance.get(`/Household/GetHouseholdByUser?userId=${userId}` )
            .then((response) => {
                setHousehold(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const GetInvites = () => {
        const userId = user.id;
        axiosInstance.get(`/HouseholdInvite/GetHouseholdInvites?userId=${userId}` )
            .then((response) => {
                console.log(response.data);
                setInvites(response.data);

                const hasPendingInvites = response.data.some((invite) => invite.isAccepted === null);

                setHasInvites(hasPendingInvites);

            })
            .catch((error) => {
                console.log(error);
            })
    }
    axiosInstance.interceptors.request.use(
        (config) => {
            const accessToken = localStorage.getItem('access_token');
            if (accessToken) {
                config.headers['Authorization'] = accessToken;
            } else {
                setAccessTokenFromRefresh()
            }
            return config;
        },
        (error) =>  {return Promise.reject(error)}
    );

    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if(error.response?.status === 401 && !originalRequest._retry){
                originalRequest._retry = true;

                try {
                    await setAccessTokenFromRefresh()

                    const accessToken = localStorage.getItem('access_token');
                    originalRequest.defaults.headers['Authorization'] = accessToken;
                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    logout()
                    return Promise.reject(refreshError)
                }
            }

            return Promise.reject(error);
}
    )

    AuthProvider.propTypes = {
        children: PropTypes.any
    }

    const createUser = (accessToken) => {
        let userInfo = jwtDecode(accessToken);
        console.log(userInfo);
        return { "name" : userInfo.unique_name,
            "id": userInfo.Id,
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

    const clearRefreshToken = () => {
        const skipIntercept = axios.create();
        skipIntercept.defaults.baseURL = backendUrl;
        skipIntercept.withCredentials = true;
        skipIntercept.get('/Auth/logout', ).catch((error) => console.log(error));
    }

    const clearHousehold = () => {
        setHousehold(null);
    }

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        clearAccessToken();
        clearRefreshToken();
        clearHousehold();
        navigator("/")
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
        axios.get("/Auth/refresh", {withCredentials: true, baseURL: backendUrl}).then((response) => {
            setAccessTokenLocalStorage(response.data);
            const createdUser = createUser(response.data);
            login(createdUser);
        })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    logout();
                }
            })
    }

    const handleCredentialResponse = (response) => {
        const skipIntercept = axios.create();
        skipIntercept.defaults.baseURL = backendUrl;
        skipIntercept.defaults.withCredentials = true;
        skipIntercept.post('/Auth/login',
            {CredentialResponse: response.credential},
        ).then((response) => {
            setAccessTokenLocalStorage(response.data)
            let user = createUser(response.data);
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
            handleCredentialResponse,
            axiosInstance,
            household,
            invites,
            hasInvites,
            GetInvites,
            GetHousehold,
            reloadComponent
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function UseAuth(){
    return useContext(AuthContext);
}



