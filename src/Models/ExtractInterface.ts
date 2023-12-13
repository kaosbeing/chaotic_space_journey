interface Cooldown {
    shipSymbol: string;
    totalSeconds: number;
    remainingSeconds: number;
    expiration: string; // date-time
}

interface Extraction {
    shipSymbol: string;
    yield: Yield;
}

interface Yield {
    symbol: string;
    units: number;
}

interface Cargo {
    capacity: number;
    units: number;
    inventory: InventoryItem[];
}

interface InventoryItem {
    symbol: string;
    name: string;
    description: string;
    units: number;
}

export interface Extract {
    cooldown: Cooldown,
    extraction: Extraction,
    cargo: Cargo
}