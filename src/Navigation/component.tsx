import React from 'react';
import './component.css';
import {Link} from 'react-router-dom'
class Navigation extends React.Component<any, any>{

    render() {
        return (
            <div className="nav">
                <div className="app-title">4559 Scout</div>
                <div className="nav-routes">
                    <Link to="/" className="button-like">
                        <span>Dashboard</span>
                    </Link>
                    <Link to="/teams" className="button-like">
                        <span>Teams</span>
                    </Link>
                    <Link to="/about" className="button-like">
                        <span>About</span>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Navigation;
