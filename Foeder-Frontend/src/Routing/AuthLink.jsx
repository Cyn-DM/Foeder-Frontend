import {Link, Navigate} from "react-router-dom";
import PropTypes from "prop-types";
import {UseAuth} from "../Authentication/AuthProvider.jsx";



export function AuthLink ({isAuthenticated, url, name}) {
    AuthLink.propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        url: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }
    if (!isAuthenticated) {
        return null;
    }

    return <Link to={url}>{name}</Link>
}

export function HouseholdWrapper({household, element}) {
    if (!household) {
        return null;
    }
    return element;
}

export function ProtectedRoute({ element, householdWrapper }) {
    const { isAuthenticated , household} = UseAuth();
    if (!isAuthenticated) {
        console.log("it reaches not authenticated")
        return <Navigate to="/unauthorized" replace />
    }
    
    if (householdWrapper){
        if (!household){
            console.log("it reaches here.")
            return <Navigate to="/household" replace />
        }
    }
    
    return element;
}