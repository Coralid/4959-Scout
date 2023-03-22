import './index.css'
import React from "react";
class NotFound extends React.Component<any, any>{
    render() {
        return (
            <>
                <h1 className="notFound heading">This page is not available in your region. So get off your VPN.</h1>
            </>
        );
    }
}

export default NotFound;