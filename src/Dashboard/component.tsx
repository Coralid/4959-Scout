import React from "react";
import MatchCard from "../Match/card";
import database from "../Database/manager"

class Dashboard extends React.Component<any, { activeMatch: string|null }>{
    render() {
        return (
            <>
                <div className="heading">Dashboard</div>
                <div className="flexible-card-main">
                    <MatchCard getMatchId={() => database.get()?.active ?? ""} info></MatchCard>
                </div>
                <div className="flexible-card-side">
                    <MatchCard getMatchId={() => "u4sow1p4va93"}></MatchCard>
                </div>
                <p>This is the Dashboard (not for dashing)</p>
                <p>A falsis, vigil raptus particula.</p>
                <p>Hercle, solem albus!, gabalium!</p>
            </>
        );
    }

}

export default Dashboard;