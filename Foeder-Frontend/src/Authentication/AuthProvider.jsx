import {createContext, useContext, useState} from "react";
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
const AuthContext = createContext(null)

export function AuthProvider({children})
{   
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    AuthProvider.propTypes = {
        children: PropTypes.any
    }

    const login = (user) => {
    setUser(user);
    setIsAuthenticated(true);
}
    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
    }

    const getAccessToken = () => {
        axios.get("/Auth/refresh").then((response) => {
            let accessToken = response.data;
            axios.defaults.headers.common['Authorization'] =  `Bearer ${accessToken}`
        })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    logout()
                    navigate('/unauthorized');
                }
            })
    }

    
    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, user, login, logout, getAccessToken}}>
            {children}
        </AuthContext.Provider>
    );
}

export function UseAuth(){
    return useContext(AuthContext);
}



