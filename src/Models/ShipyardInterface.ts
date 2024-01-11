
export interface Shipyard {
    symbol: string;
    shipTypes: ShipType[];
    transactions?: Transaction[];
    ships?: ShipyardShip[],
    modificationsFee: number;
}

interface Transaction {
    waypointSymbol: string;
    shipSymbol: string;
    shipType: string;
    price: number;
    agentSymbol: string;
    timestamp: string; // Should be a valid date-time string
};

export interface ShipyardShip {
    type: "SHIP_PROBE" |
    "SHIP_MINING_DRONE" |
    "SHIP_SIPHON_DRONE" |
    "SHIP_INTERCEPTOR" |
    "SHIP_LIGHT_HAULER" |
    "SHIP_COMMAND_FRIGATE" |
    "SHIP_EXPLORER" |
    "SHIP_HEAVY_FREIGHTER" |
    "SHIP_LIGHT_SHUTTLE" |
    "SHIP_ORE_HOUND" |
    "SHIP_REFINING_FREIGHTER" |
    "SHIP_SURVEYOR";
    name: string;
    description: string;
    supply: "SCARCE" | "LIMITED" | "MODERATE" | "HIGH" | "ABUNDANT";
    activity?: "WEAK" | "GROWING" | "STRONG" | "RESTRICTED";
    purchasePrice: number;
    frame: Frame;
    reactor: Reactor;
    engine: Engine;
    modules?: Module[];
    mounts?: Mount[];
    crew: {
        required: number;
        capacity: number;
    }
}

interface Frame {
    symbol: "FRAME_PROBE" |
    "FRAME_DRONE" |
    "FRAME_INTERCEPTOR" |
    "FRAME_RACER" |
    "FRAME_FIGHTER" |
    "FRAME_FRIGATE" |
    "FRAME_SHUTTLE" |
    "FRAME_EXPLORER" |
    "FRAME_MINER" |
    "FRAME_LIGHT_FREIGHTER" |
    "FRAME_HEAVY_FREIGHTER" |
    "FRAME_TRANSPORT" |
    "FRAME_DESTROYER" |
    "FRAME_CRUISER" |
    "FRAME_CARRIER";
    name: string;
    description: string;
    condition?: number;
    moduleSlots: number;
    mountingPoints: number;
    fuelCapacity: number;
    requirements: {
        power: number;
        crew: number;
        solts: number;
    };
}

interface Reactor {
    symbol: "REACTOR_SOLAR_I" |
    "REACTOR_FUSION_I" |
    "REACTOR_FISSION_I" |
    "REACTOR_CHEMICAL_I" |
    "REACTOR_ANTIMATTER_I";
    name: string;
    description: string;
    condition?: number;
    powerOutput: number;
    requirements: {
        power: number;
        crew: number;
    };
}

interface Engine {
    symbol: "ENGINE_IMPULSE_DRIVE_I" |
    "ENGINE_ION_DRIVE_I" |
    "ENGINE_ION_DRIVE_II" |
    "ENGINE_HYPER_DRIVE_I";
    name: string;
    description: string;
    condition?: number;
    speed: number;
    requirements: {
        power: number;
        crew: number;
    };
}

interface Mount {
    symbol: "MOUNT_GAS_SIPHON_I" |
    "MOUNT_GAS_SIPHON_II" |
    "MOUNT_GAS_SIPHON_III" |
    "MOUNT_SURVEYOR_I" |
    "MOUNT_SURVEYOR_II" |
    "MOUNT_SURVEYOR_III" |
    "MOUNT_SENSOR_ARRAY_I" |
    "MOUNT_SENSOR_ARRAY_II" |
    "MOUNT_SENSOR_ARRAY_III" |
    "MOUNT_MINING_LASER_I" |
    "MOUNT_MINING_LASER_II" |
    "MOUNT_MINING_LASER_III" |
    "MOUNT_LASER_CANNON_I" |
    "MOUNT_MISSILE_LAUNCHER_I" |
    "MOUNT_TURRET_I";
    name: string;
    description?: string;
    strength?: number;
    deposits?: ("QUARTZ_SAND" | "SILICON_CRYSTALS" | "PRECIOUS_STONES" | "ICE_WATER" | "AMMONIA_ICE" | "IRON_ORE" | "COPPER_ORE" | "SILVER_ORE" | "ALUMINUM_ORE" | "GOLD_ORE" | "PLATINUM_ORE" | "DIAMOND" | "URANITE_ORE" | "MERITIUM_ORE")[];
    requirements: {
        power: number;
        crew: number;
        slots: number;
    };
}

interface Module {
    symbol: "MODULE_MINERAL_PROCESSOR_I" |
    "MODULE_GAS_PROCESSOR_I" |
    "MODULE_CARGO_HOLD_I" |
    "MODULE_CARGO_HOLD_II" |
    "MODULE_CARGO_HOLD_III" |
    "MODULE_CREW_QUARTERS_I" |
    "MODULE_ENVOY_QUARTERS_I" |
    "MODULE_PASSENGER_CABIN_I" |
    "MODULE_MICRO_REFINERY_I" |
    "MODULE_ORE_REFINERY_I" |
    "MODULE_FUEL_REFINERY_I" |
    "MODULE_SCIENCE_LAB_I" |
    "MODULE_JUMP_DRIVE_I" |
    "MODULE_JUMP_DRIVE_II" |
    "MODULE_JUMP_DRIVE_III" |
    "MODULE_WARP_DRIVE_I" |
    "MODULE_WARP_DRIVE_II" |
    "MODULE_WARP_DRIVE_III" |
    "MODULE_SHIELD_GENERATOR_I" |
    "MODULE_SHIELD_GENERATOR_II";
    capacity?: number;
    range?: number;
    name: string;
    description: string;
    requirements: {
        power: number;
        crew: number;
        slots: number;
    };
}

interface ShipType {
    type: "SHIP_PROBE" |
    "SHIP_MINING_DRONE" |
    "SHIP_SIPHON_DRONE" |
    "SHIP_INTERCEPTOR" |
    "SHIP_LIGHT_HAULER" |
    "SHIP_COMMAND_FRIGATE" |
    "SHIP_EXPLORER" |
    "SHIP_HEAVY_FREIGHTER" |
    "SHIP_LIGHT_SHUTTLE" |
    "SHIP_ORE_HOUND" |
    "SHIP_REFINING_FREIGHTER" |
    "SHIP_SURVEYOR";
}