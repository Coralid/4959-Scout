import React from "react";
import {withRouter} from "../tools";
import "./component.css"
import database from "../Database/manager";
import {ScoutData} from "../Database/type";
import {TeamData} from "./type";
import MatchCard from "../Match/card";
import DataCard from "../Data/card";
import DataItem from "../Data/wrapper";

class Team extends React.Component<any, { team: TeamData|null }>{

    constructor(props: any) {
        super(props);
        this.state = {
            team: null
        }
    }

    componentDidMount() {
        database.subscribe((snap: ScoutData) => {
            if (this.props.id !== null) {
                this.setState({
                    team: snap.teams[this.props.id]
                });
            }
        });
    }

    render() {
        const cones = new DataItem("Cone");
        cones.append(`teams/${this.state.team?.id}/abilities/teleop/cone/low`, this.state.team?.abilities.teleop.cone.low);
        cones.append(`teams/${this.state.team?.id}/abilities/teleop/cone/mid`, this.state.team?.abilities.teleop.cone.mid);
        cones.append(`teams/${this.state.team?.id}/abilities/teleop/cone/high`, this.state.team?.abilities.teleop.cone.high);
        const cubes = new DataItem("Cone");
        cubes.append(`teams/${this.state.team?.id}/abilities/teleop/cube/low`, this.state.team?.abilities.teleop.cube.low);
        cubes.append(`teams/${this.state.team?.id}/abilities/teleop/cube/mid`, this.state.team?.abilities.teleop.cube.mid);
        cubes.append(`teams/${this.state.team?.id}/abilities/teleop/cube/high`, this.state.team?.abilities.teleop.cube.high);
        return (
            <>
                <div className="heading">{this.state.team?.name}</div>
                <div className="subheading">#{this.state.team?.id}</div>
                <br />
                <div className="flexible-card-main">
                    <div className="section-heading">Scout</div>
                    <div className="subheading">Abilities</div>
                    <DataCard color="var(--4959-theme-cone)" svg={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="m11.46,2.33l-5.46,23.67h-3c-1.66,0-3,1.34-3,3h0c0,1.66,1.34,3,3,3h26c1.66,0,3-1.34,3-3h0c0-1.66-1.34-3-3-3h-3L20.36,2.31C20.04.95,18.83,0,17.44,0h-3.05c-1.4,0-2.61.96-2.92,2.33Z"/></svg>} src={cones} mutable/>
                    <DataCard color="var(--4959-theme-cube)" svg={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="m29.05,28.94h0c-8.15,4.07-17.74,4.07-25.89,0h0s0,0,0,0C-.91,20.8-.91,11.2,3.16,3.06h0s0,0,0,0C11.31-1.02,20.9-1.02,29.05,3.06h0s0,0,0,0c4.07,8.15,4.07,17.74,0,25.89h0Z"/></svg>} src={cubes} mutable/>
                </div>
                <div className="flexible-card-side">
                    <div className="section-heading">Matches</div>
                    {
                        this.state.team?.matches.map((match) => {
                            return <MatchCard key={match.id} getMatchId={() => match.id}></MatchCard>;
                        })
                    }
                </div>
            </>
        );
    }

}

export default withRouter(Team);