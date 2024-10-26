import {createContext, useContext, useState} from "react";
import PropTypes from 'prop-types';
const AuthContext = createContext(null)

export function AuthProvider({children})
{   
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

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


    
    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export function UseAuth(){
    return useContext(AuthContext);
}


