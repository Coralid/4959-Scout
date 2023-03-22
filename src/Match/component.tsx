import React from "react";
import {withRouter} from "../tools";
import './component.css'
import database from "../Database/manager";
import {ScoutData} from "../Database/type";
import {MatchData} from "./type";

class Match extends React.Component<any, { match: MatchData|null }>{

    constructor(props: any) {
        super(props);
        this.state = {
            match: null
        }
    }

    componentDidMount() {
        database.subscribe((snap: ScoutData) => {
            if (this.props.id !== null) {
                this.setState({
                    match: snap.competitions[this.props.id.substring(0, 6)].matches[this.props.id.substring(6)]
                });
            }
        });
    }

    render() {
        return (
            <>
                <div className="heading">{this.state.match?.title}</div>
            </>
        );
    }

}

export default withRouter(Match);