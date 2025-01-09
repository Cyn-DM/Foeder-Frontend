import {createContext, useContext, useEffect, useState} from "react";
import {UseContext} from "./ContextProvider.jsx";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import {Await, useNavigate} from "react-router-dom";
import * as signalR from "@microsoft/signalr/";
const AuthProv = createContext(null)

export function AuthProvider({children}) {
    const {user, setLoading, setUser, setIsAuthenticated, isAuthenticated, household, backendUrl, setHousehold, axiosInstance, invites, setHasInvites, setInvites, backendSignalRUrl, userRefresh, setUserRefresh} = UseContext();
    const navigator = useNavigate();
    const [inviteNotification, setInviteNotification] = useState(null);
    
    
    useEffect(() => {
        setAccessTokenFromRefresh()
        setLoading(false);
    }, [])

    useEffect(() => {
        if (user !== null){
            GetHousehold();
            GetInvites();
        }
    }, [user])

    useEffect(() => {
        if (userRefresh === true) {
            setAccessTokenFromRefresh();
            setUserRefresh(false);
        }
    }, [userRefresh]);


    const  connectToHub = () => {
        let inviteUrl = backendSignalRUrl + "/inviteHub";
        
        var connection = new signalR.HubConnectionBuilder()
            .withUrl(inviteUrl, {accessTokenFactory: () =>  {
                    let token = localStorage.getItem('access_token')

                    if (token.startsWith('Bearer ')) {
                        token = token.substring(7); 
                    }
                    
                    return token;
            } })
            .build();
        
        connection.start()
            .then(
                connection.on('ReceiveInvite', (message) => {setInviteNotification(message);})
            )
            .catch(error => { console.log(error)})

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

    const clearRefreshToken = () => {
        const skipIntercept = axios.create();
        skipIntercept.defaults.baseURL = backendUrl;
        skipIntercept.defaults.withCredentials = true;
        skipIntercept.get('/Auth/logout', ).catch((error) => console.log(error));
    }

    const clearAccessToken = () => {
        if (localStorage.getItem('access_token')) {
            localStorage.removeItem("accessToken");
        }
    }

    const setAccessTokenLocalStorage = (accessToken) => {
        if (localStorage.getItem('access_token')) {
            localStorage.removeItem('access_token');
        }
        localStorage.setItem('access_token', `Bearer ${accessToken}`);
    }


    const logout = () => {
        if (user){
            setUser(null);
        }
        if (isAuthenticated){
            setIsAuthenticated(false);
        }
        if (household){
            setHousehold(null);
        }

        clearAccessToken();
        clearRefreshToken();
        const isOnUnauthorized = location.pathname === "/unauthorized";

        if (!isOnUnauthorized){
            navigator("/")
        }
    }

    const login = (user) => {
        setUser(user);
        setIsAuthenticated(true);
        connectToHub();
    }

    const createUser = (accessToken) => {
        let userInfo = jwtDecode(accessToken);
        return { "name" : userInfo.unique_name,
            "id": userInfo.Id,
            "email" : userInfo.email,
            "householdId" : userInfo.HouseholdId ?? undefined,
        }
    }

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
        return axiosInstance.get(`/HouseholdInvite/GetHouseholdInvites?userId=${userId}` )
            .then((response) => {
                console.log(response.data);
                setInvites(response.data);

                const hasPendingInvites = response.data.some((invite) => invite.isAccepted === null);

                setHasInvites(hasPendingInvites);

                return response.data;

            })
            .catch((error) => {
                return error.message;
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
        });

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
    
    const refreshAuth = () => {
        setAccessTokenFromRefresh();
    }

    return (<AuthProv.Provider value={{
        GetInvites,
        GetHousehold,
        handleCredentialResponse,
        refreshAuth,
        logout,
        inviteNotification,
    }}>
        {children}
    </AuthProv.Provider>);
}

export function UseAuth(){
    return useContext(AuthProv);
}