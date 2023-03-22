import React from "react";
import './card.css'
import database from "../Database/manager"
import {ScoutData} from "../Database/type";
import {Link} from "react-router-dom";
import {TeamData} from "./type";
import {MatchData} from "../Match/type";
class TeamCard extends React.Component<
    { teamId: number }, { team: TeamData|null, activity: string, match: MatchData|null }>{

    constructor(props: any) {
        super(props);
        this.state = {
            team: null,
            activity: "none",
            match: null
        }
    }

    componentDidMount() {
        database.subscribe((snap: ScoutData) => {
            let activeMatch = "none"
            let match = null;
            if (snap.active) {
                match = snap.competitions[snap.active.substring(0, 6)].matches[snap.active.substring(6)];
                match.alliances.red.forEach((member, i) => {
                    if (member.team === this.props.teamId) activeMatch = snap.active + "r" + i;
                });
                match.alliances.blue.forEach((member, i) => {
                    if (member.team === this.props.teamId) activeMatch = snap.active + "b" + i;
                });
                this.setState({
                    team: snap.teams[this.props.teamId],
                    activity: activeMatch,
                    match: activeMatch !== "none" ? match : null
                })
            }
        });
    }

    render() {
        let allianceInfo;
        switch (this.state.activity.substring(12, 13)) {
            case 'r':
                allianceInfo = "RED " + (Number(this.state.activity.substring(13)) + 1);
                break;
            case 'b':
                allianceInfo = "BLUE " + (Number(this.state.activity.substring(13)) + 1);
                break;
            default:
                allianceInfo = "NEUTRAL " + (Number(this.state.activity.substring(13)) + 1);
                break;
        }
        return (
            <Link className="team-card" to={`/team/${this.state.team?.id}`}>
                <div className="team-title">
                    {this.state.team?.name}
                </div>
                <div className="team-card-content">
                    <span className="team-number">#{this.state.team?.id}</span>
                    &emsp;
                    <span className="team-rating">RANK: 1</span>
                    {
                        this.state.team?.notes.map((note: string, index: number) => {
                            return <div className="team-note" key={index}>{note}</div>
                        })
                    }
                    {
                        this.state.activity !== "none" ? (
                            <div>
                                <div className="indicator"></div> {this.state.match?.title} <div className="indicator-descriptive" style={{background: `var(--4959-theme-${this.state.activity.substring(12, 13)})`}}>{allianceInfo}</div>
                            </div>
                        ) : undefined
                    }
                </div>
            </Link>
        );
    }

}

export default TeamCard;