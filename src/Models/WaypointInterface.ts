
export interface Waypoint {
    systemSymbol: string;
    symbol: string;
    type: string;
    x: number;
    y: number;
    orbitals: Orbital[];
    orbits?: string;
    traits: Trait[];
    modifiers: Modifiers[];
    chart: Chart;
    faction: Faction;
    isUnderConstruction: boolean;
}

interface Orbital {
    symbol: string;
}

interface Trait {
    symbol: string;
    name: string;
    description: string;
}

interface Chart {
    submittedBy: string;
    submittedOn: string;
}

interface Faction {
    symbol: string;
}

interface Modifiers {
    symbol: string;
    name: string;
    description: string;
}