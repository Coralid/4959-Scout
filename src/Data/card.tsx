import React from "react";

import "./card.css"
import DataItem from "./wrapper";
import manager from "../Database/manager";
import Menu from "../ContextMenu/component";
import {MenuNumber} from "../ContextMenu/items";

class DataCard extends React.Component<{ src: DataItem, color: string, svg: JSX.Element, mutable: boolean }, any>{

    static defaultProps = {
        color: "var(--4959-theme-primary)",
        svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"></svg>,
        mutable: false
    }

    constructor(props: any) {
        super(props);
        this.state = {
            menu: {
                active: false
            }
        }
    }


    openMenu(event: React.MouseEvent, value: string) {
        event.preventDefault();
        this.setState({
            menu: {
                active: true,
                event: event,
                value: value
            }
        });
    }

    render() {
        return (
            <>
                {
                    this.state.menu.active && this.props.src.values[this.state.menu.value] !== undefined ? (
                        <Menu title={this.props.src.title} x={this.state.menu.event.clientX} y={this.state.menu.event.clientY}>
                            <MenuNumber autoFocus title={this.state.menu.value} {...(this.props.src.values[this.state.menu.value])} />
                            {/*<MenuOption title={"balls lol"}></MenuOption>*/}
                        </Menu>
                    ) : undefined
                }
                <div className="data-card" style={{"--data-theme": this.props.color} as React.CSSProperties}>
                    {this.props.svg}
                    {
                        Object.keys(this.props.src.values).map((title) => {
                            if ((typeof this.props.src.values[title].value) === 'boolean' && this.props.mutable) {
                                return (
                                    <button key={title} onClick={() => {
                                        manager.set(this.props.src.values[title].path, !this.props.src.values[title].value);
                                    }}
                                            className={`${typeof this.props.src.values[title].value}-value${this.props.mutable ? " mutable" : ""}`}
                                            data-value={this.props.src.values[title].value}>
                                        {title.toUpperCase()}
                                    </button>
                                );
                            } else if (typeof this.props.src.values[title].value === 'number' && this.props.mutable) {
                                return (
                                    <button key={title} className={`button-like ${typeof this.props.src.values[title].value}-value${this.props.mutable ? " mutable" : ""}`}
                                            onClick={() => {
                                                manager.set(this.props.src.values[title].path, this.props.src.values[title].value + 1);
                                            }}
                                            onContextMenu={(event) => this.openMenu(event, title)}
                                            data-value={this.props.src.values[title].value}>
                                        {title.toUpperCase()}<br />
                                        {this.props.src.values[title].value}
                                    </button>
                                );
                            } else if (typeof this.props.src.values[title].value === 'number' && !this.props.mutable) {
                                return (
                                    <div key={title} className={`button-like ${typeof this.props.src.values[title].value}-value${this.props.mutable ? " mutable" : ""}`}
                                         data-value={this.props.src.values[title].value}>
                                        {title.toUpperCase()}: {this.props.src.values[title].value}
                                    </div>
                                );
                            }
                            return (
                                <div key={title} className={`button-like ${typeof this.props.src.values[title].value}-value${this.props.mutable ? " mutable" : ""}`}
                                       data-value={this.props.src.values[title].value}>
                                    {title.toUpperCase()}
                                </div>
                            );
                        })
                    }
                </div>
            </>
        );
    }

}

export default DataCard;