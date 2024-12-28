import {Link, useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import {UseAuth} from "../Authentication/AuthProvider.jsx";
import {Unauthorized} from "../Components/Unauthorized.jsx";


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

export function ProtectedRoute({ element }) {
    const nav = useNavigate()
    const { isAuthenticated } = UseAuth();
    
    if (!isAuthenticated) {nav('/unauthorized');}
    return element;
}