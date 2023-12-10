import { createContext } from 'react';
import { ShipData } from '../../Models/ShipInterface';
import { Waypoint } from '../../Models/WaypointInterface';
import { Market } from '../../Models/MarketInterface';

export interface DashboardData {
    ship: ShipData | null,
    waypoint: Waypoint | null,
    market: Market | null,
}

export const DashboardContext = createContext<DashboardData>({
    ship: null,
    waypoint: null,
    market: null,
});