interface TeamData {
    id: number;
    name: string;
    matches: {
        id: string;
        score: number;
        charge: boolean;
    }[];
    notes: string[];
    drivetrain: string;
    strategy: string;
    abilities: {
        autonomous: {
            movement: boolean;
            cone: {
                high: boolean;
                low: boolean;
                mid: boolean;
            }
            cube: {
                high: boolean;
                low: boolean;
                mid: boolean;
            }
            charge: boolean;
        }
        teleop: {
            movement: boolean;
            cone: {
                high: boolean;
                low: boolean;
                mid: boolean;
            }
            cube: {
                high: boolean;
                low: boolean;
                mid: boolean;
            }
            charge: boolean;
        }
    }
}

interface Performance {
    cones: {
        auto: number;
        teleop: number;
    },
    cubes: {
        auto: number,
        teleop: number,
    },
    charge: {
        auto: boolean,
        teleop: boolean
    }
}

export type { TeamData, Performance }