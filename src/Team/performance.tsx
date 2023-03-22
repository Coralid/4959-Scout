import React from "react";

import database from "../Database/manager"
import {ScoutData} from "../Database/type";
import DataCard from "../Data/card";
import DataItem from "../Data/wrapper";

class PerformanceCards extends React.Component<
    {match: string|undefined, teamId: number|undefined}, any>{

    matchId: string
    teamId: number

    constructor(props: any) {
        super(props);
        this.matchId = this.props.match ?? "none";
        this.teamId = this.props.teamId ?? 0;
        this.state = {
            cones: {
                auto: 0,
                teleop: 0,
            },
            cubes: {
                auto: 0,
                teleop: 0,
            },
            charge: {
                auto: false,
                teleop: false
            },
            alliance: {
                color: "none",
                slot: -1
            }
        }
    }

    componentDidMount() {
        database.subscribe((snap: ScoutData) => {
            const match = snap.competitions[this.matchId.substring(0, 6)].matches[this.matchId.substring(6)];
            match.alliances.red.forEach((member, index) => {
                if (member.team === this.teamId) {
                    this.setState({
                        ...member,
                        alliance: {
                            color: "red",
                            slot: index
                        }
                    });
                }
            });
            match.alliances.blue.forEach((member, index) => {
                if (member.team === this.teamId) {
                    this.setState({
                        ...member,
                        alliance: {
                            color: "blue",
                            slot: index
                        }
                    });

                }

            });
        });
    }

    render() {
        const cones = new DataItem("cone");
        cones.append(`competitions/${this.matchId.substring(0, 6)}/matches/${this.matchId.substring(6)}/alliances/${this.state.alliance.color}/${this.state.alliance.slot}/cones/auto`, this.state.cones.auto);
        cones.append(`competitions/${this.matchId.substring(0, 6)}/matches/${this.matchId.substring(6)}/alliances/${this.state.alliance.color}/${this.state.alliance.slot}/cones/teleop`, this.state.cones.teleop);
        const cubes = new DataItem("cube");
        cubes.append(`competitions/${this.matchId.substring(0, 6)}/matches/${this.matchId.substring(6)}/alliances/${this.state.alliance.color}/${this.state.alliance.slot}/cubes/auto`, this.state.cubes.auto);
        cubes.append(`competitions/${this.matchId.substring(0, 6)}/matches/${this.matchId.substring(6)}/alliances/${this.state.alliance.color}/${this.state.alliance.slot}/cubes/teleop`, this.state.cubes.teleop);
        const charge = new DataItem("charge");
        charge.append(`competitions/${this.matchId.substring(0, 6)}/matches/${this.matchId.substring(6)}/alliances/${this.state.alliance.color}/${this.state.alliance.slot}/charge/auto`, this.state.charge.auto);
        charge.append(`competitions/${this.matchId.substring(0, 6)}/matches/${this.matchId.substring(6)}/alliances/${this.state.alliance.color}/${this.state.alliance.slot}/charge/teleop`, this.state.charge.teleop);
        return (
            <div>
                <DataCard mutable color="var(--4959-theme-cone)" svg={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="m11.46,2.33l-5.46,23.67h-3c-1.66,0-3,1.34-3,3h0c0,1.66,1.34,3,3,3h26c1.66,0,3-1.34,3-3h0c0-1.66-1.34-3-3-3h-3L20.36,2.31C20.04.95,18.83,0,17.44,0h-3.05c-1.4,0-2.61.96-2.92,2.33Z"/></svg>} src={cones}/>
                <DataCard mutable color="var(--4959-theme-cube)" svg={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="m29.05,28.94h0c-8.15,4.07-17.74,4.07-25.89,0h0s0,0,0,0C-.91,20.8-.91,11.2,3.16,3.06h0s0,0,0,0C11.31-1.02,20.9-1.02,29.05,3.06h0s0,0,0,0c4.07,8.15,4.07,17.74,0,25.89h0Z"/></svg>} src={cubes}/>
                <DataCard mutable color="var(--4959-theme-charge)" svg={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><polygon points="32 15.84 18.12 12.31 25.2 0 0 16.16 13.88 19.69 6.8 32 32 15.84"/></svg>} src={charge}/>
            </div>
        );
    }

}

export default PerformanceCards;