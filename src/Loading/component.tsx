import React from "react";

import './component.css'

class Loading extends React.Component<any, any> {

    render() {
        return (
            <div className="loading-component">
                <svg version="1.1" className={"loading" + (this.props.inline ? "-inline" : "")} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 50 50">
                    <circle className="loading-c1" cx="25" cy="25" r="20"/>
                    <circle className="loading-c0" cx="25" cy="25" r="20"/>
                </svg>
            </div>
        );
    }

}

export default Loading;