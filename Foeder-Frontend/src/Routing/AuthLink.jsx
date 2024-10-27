import {Link} from "react-router-dom";
import PropTypes from "prop-types";


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