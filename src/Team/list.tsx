import React from "react";
import database from "../Database/manager"
import {ScoutData} from "../Database/type";
import TeamCard from "./card";
import Loading from "../Loading/component";

class TeamList extends React.Component<any, { teams: string[]|null }> {

    constructor(props: any) {
        super(props);
        this.state = {
            teams: null
        }
    }

    componentDidMount() {
        database.subscribe((snap: ScoutData) => {
            this.setState({
                teams: Object.keys(snap.teams)
            });
        });
    }

    render() {
        return (
            <>
                <div className="heading">Teams <input placeholder="Search"/></div>
                <br/>
                {
                    this.state.teams == null ? <Loading /> : (
                        this.state.teams?.map((team: string) => {
                            return <TeamCard key={team} teamId={Number(team)}/>
                        })
                    )
                }
                <div className="newTeam">
                    <h3>Create A New Team</h3>
                    <h1>+</h1>
                </div>
            </>
        );
    }

}

export default TeamList;