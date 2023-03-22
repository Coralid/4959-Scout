import React from 'react';
import './card.css';
import database from "../Database/manager";
import {ScoutData} from "../Database/type";
import {MatchData} from "./type";
import TeamCard from "../Team/card";
import PerformanceCards from "../Team/performance";
import {Link} from "react-router-dom";
import Loading from "../Loading/component";

class MatchCard extends React.Component<{ getMatchId: () => string|null|undefined, info: boolean }, { match: MatchData|null, info: boolean }>{

    static defaultProps = {
        info: false
    }

    constructor(props: any) {
        super(props);
        this.state = {
            match: null,
            info: this.props.info ?? true
        }
    }

    componentDidMount() {
        database.subscribe((snap: ScoutData) => {
            const matchId = this.props.getMatchId();
            if (matchId!== null && matchId !== undefined) {
                this.setState({
                    match: snap.competitions[matchId.substring(0, 6)].matches[matchId.substring(6)]
                })
            }
        });
    }

    render() {
        if (this.state.match == null) {
            return <Loading />;
        } else {
            return (
                <div className="card">
                    <div className="title-bar">
                        <Link className="match-link" to={`/match/${this.state.match.id}`}>
                            <span className="section-heading">{this.state.match.title}</span>
                            <span className="subheading">{database.get()?.competitions[this.state.match.competition].title}</span>
                        </Link>
                        <div className="match-options">
                            <a className="button-like" href={this.state.match.webcast}>
                                <div className="indicator"></div>&ensp;Live
                            </a>
                            <button className="dropdown" onClick={(() => this.setState({info: !this.state.info}))}>
                                { this.state.info ? "Collapse" : "Expand" }
                                &ensp;
                                <svg style={{transform: `rotate(${Number(this.state.info) * 180}deg)`}}
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M0 0h24v24H0z" fill="none"/><path d="M7 10l5 5 5-5z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    {
                        this.state.info ? (
                            <div className="data-table">
                                <div className="data-item">
                                    <TeamCard teamId={this.state.match.alliances.red[0].team}></TeamCard>
                                    <PerformanceCards teamId={this.state.match.alliances.red[0].team} match={this.state.match.id} />
                                </div>
                                <div className="data-item">
                                    <TeamCard teamId={this.state.match.alliances.red[1]?.team}></TeamCard>
                                    <PerformanceCards teamId={this.state.match.alliances.red[1]?.team} match={this.state.match.id}/>
                                </div>
                                <div className="data-item">
                                    <TeamCard teamId={this.state.match.alliances.red[2]?.team}></TeamCard>
                                    <PerformanceCards teamId={this.state.match.alliances.red[2]?.team} match={this.state.match.id}/>
                                </div>
                                <div className="data-item">
                                    <TeamCard teamId={this.state.match.alliances.blue[0].team}></TeamCard>
                                    <PerformanceCards teamId={this.state.match.alliances.blue[0].team} match={this.state.match.id}/>
                                </div>
                                <div className="data-item">
                                    <TeamCard teamId={this.state.match.alliances.blue[1]?.team}></TeamCard>
                                    <PerformanceCards teamId={this.state.match.alliances.blue[1]?.team} match={this.state.match.id}/>
                                </div>
                                <div className="data-item">
                                    <TeamCard teamId={this.state.match.alliances.blue[2]?.team}></TeamCard>
                                    <PerformanceCards teamId={this.state.match.alliances.blue[2]?.team} match={this.state.match.id}/>
                                </div>
                            </div>
                        ) : undefined
                    }
                </div>
            );
        }
    }
}

export default MatchCard;
