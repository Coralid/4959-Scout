import React from "react";

class Menu extends React.Component<any, any>{

    render() {
        return (
            <div key={this.props.depth === 0 ? "root-menu" : ("sub-menu-" + this.props.x)} className="menu" style={{left: this.props.x, top: this.props.y}}>
                <div key={this.props.title} className="menu-title">
                    {this.props.title.toUpperCase()}
                </div>
                {this.props.children}
            </div>
        );
    }

}

export default Menu;