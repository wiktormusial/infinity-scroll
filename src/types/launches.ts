export interface Launch {
    id: string,
    mission_name: string,
}

export interface LaunchList {
    launches: Launch[]
}

export interface LaunchVars {
    offset: number,
    limit: number,
}