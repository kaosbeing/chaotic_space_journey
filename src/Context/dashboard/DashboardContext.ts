import { createContext } from 'react';
import { Cargo, Cooldown, Fuel, Nav, ShipData } from '../../Models/ShipInterface';
import { Waypoint } from '../../Models/WaypointInterface';
import { Market } from '../../Models/MarketInterface';

interface PartialShip {
    symbol: String | null,
    cargo: Cargo | null,
    nav: Nav | null,
    cooldown: Cooldown | null,
    fuel: Fuel | null,
}

export interface DashboardData {
    ship: PartialShip | null,
    waypoint: Waypoint | null,
    market: Market | null,
}

export const DashboardContext = createContext<DashboardData>({
    ship: null,
    waypoint: null,
    market: null,
});