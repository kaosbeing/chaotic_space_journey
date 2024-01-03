import { createContext } from 'react';
import { Agent } from '../../Models/AgentInterface';
import { Ship } from '../../Models/ShipInterface';

interface Spacetraders {
    agent: Agent | null,
    fleet: Ship[],
    updateAgent: (agent: Agent) => void,
    updateFleet: (fleet: Ship[]) => void,
    updateShip: (ship: Ship) => void,
    changeFlightMode: (ship: Ship, flightMode: string) => void,
    extractRessources: (ship: Ship) => void,
    refuelShip: (ship: Ship) => void,
    changeNavStatus: (ship: Ship, action: string) => void,
    navigate: (ship: Ship, waypointSymbol: string) => void,
}

export const SpacetradersContext = createContext<Spacetraders>({
    agent: null,
    fleet: [],
    updateAgent: () => { },
    updateFleet: () => { },
    updateShip: () => { },
    changeFlightMode: () => { },
    extractRessources: () => { },
    refuelShip: () => { },
    changeNavStatus: () => { },
    navigate: () => { }
});