import React from "react";
import Menu from "./component";
import manager from "../Database/manager";

class MenuGroup extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = {
            menuHidden: true
        }
    }

    render() {
        return (
            <button key={this.props.title} onMouseEnter={() => {
                this.setState({
                    menuHidden: false
                });
            }} className="option">
                {this.props.title}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><polygon points="6.23,20.23 8,22 18,12 8,2 6.23,3.77 14.46,12"/></g></svg>
                <Menu title={this.props.title} hidden={this.state.menuHidden} x={217} y={0}>
                    {this.props.children}
                </Menu>
            </button>
        );
    }
}

class MenuField extends React.Component<{ title: string, value: string, path: string, autoFocus: boolean }, any>{

    static defaultProps = {
        autoFocus: false
    }

    render() {
        return (
            <input autoFocus={this.props.autoFocus} key={this.props.title} className="option" value={this.props.value}
                   placeholder={this.props.title} onChange={(event) => {
                        manager.set(this.props.path, event.target.value)
                   }
            }></input>
        );
    }
}

class MenuNumber extends React.Component<{ title: string, value: number, path: string, autoFocus: boolean }, any>{

    static defaultProps = {
        autoFocus: false
    }

    render() {
        return (
            <div>
                <div key={this.props.title} className="option">
                    {this.props.title.toUpperCase()}
                </div>
                <button onClick={() => {
                    manager.set(this.props.path, this.props.value - 1);
                }}>-</button>
                <input autoFocus={this.props.autoFocus} type="number" value={this.props.value}
                    onChange={(event) => {
                       manager.set(this.props.path, Number(event.target.value))
                    }
                }></input>
                <button onClick={() => {
                    manager.set(this.props.path, this.props.value + 1);
                }}>+</button>
            </div>
        );
    }
}

class MenuOption extends React.Component<any, any>{

    render() {
        return (
            <button key={this.props.title} className="option">{this.props.title}</button>
        );
    }
}


export {MenuGroup, MenuField, MenuNumber, MenuOption}