import {MatchData} from "../Match/type";
import {TeamData} from "../Team/type";

interface ScoutData {
    active: string|null;
    competitions: {
        [key: string]: {
            id: string;
            title: string;
            address: string;
            matches: {
                [key: string]: MatchData
            }
        }
    }
    teams: {
        [key: string]: TeamData
    }
}

export type { ScoutData }