export interface FleetData {
    data: ShipData[],
    meta: {
        total: number,
        page: number,
        limit: number
    }
}

export interface ShipData {
    symbol: string;
    nav: Nav;
    crew: Crew;
    fuel: Fuel;
    cooldown: Cooldown;
    frame: Frame;
    reactor: Reactor;
    engine: Engine;
    modules: Module[];
    mounts: Mount[];
    registration: Registration;
    cargo: Cargo;
}

interface Nav {
    systemSymbol: string;
    waypointSymbol: string;
    route: {
        departure: Waypoint;
        origin: Waypoint;
        destination: Waypoint;
        arrival: string;
        departureTime: string;
    };
    status: string;
    flightMode: string;
}

interface Waypoint {
    symbol: string;
    type: string;
    systemSymbol: string;
    x: number;
    y: number;
}

interface Crew {
    current: number;
    capacity: number;
    required: number;
    rotation: string;
    morale: number;
    wages: number;
}

interface Fuel {
    current: number;
    capacity: number;
    consumed: {
        amount: number;
        timestamp: string;
    };
}

interface Cooldown {
    shipSymbol: string;
    totalSeconds: number;
    remainingSeconds: number;
}

interface Frame {
    symbol: string;
    name: string;
    description: string;
    moduleSlots: number;
    mountingPoints: number;
    fuelCapacity: number;
    condition: number;
    requirements: {
        power: number;
        crew: number;
    };
}

interface Reactor {
    symbol: string;
    name: string;
    description: string;
    condition: number;
    powerOutput: number;
    requirements: {
        crew: number;
    };
}

interface Engine {
    symbol: string;
    name: string;
    description: string;
    condition: number;
    speed: number;
    requirements: {
        power: number;
        crew: number;
    };
}

interface Module {
    symbol: string;
    name: string;
    description: string;
    capacity?: number;
    requirements: {
        crew: number;
        power: number;
        slots: number;
    };
}

interface Mount {
    symbol: string;
    name: string;
    description: string;
    strength: number;
    deposits?: string[];
    requirements: {
        crew: number;
        power: number;
    };
}

interface Registration {
    name: string;
    factionSymbol: string;
    role: string;
}

interface Cargo {
    capacity: number;
    units: number;
    inventory: any[];
}