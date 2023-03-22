import {Performance} from "../Team/type";

interface MatchData {
    id: string;
    title: string;
    competition: string;
    webcast: string;
    alliances: {
        red: {
            data: Performance
            team: number
        }[],
        blue: {
            data: Performance
            team: number
        }[]
    }
}

export type { MatchData };