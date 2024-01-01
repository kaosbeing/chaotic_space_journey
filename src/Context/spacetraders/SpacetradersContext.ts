import { createContext } from 'react';
import { Agent } from '../../Models/AgentInterface';
import { Ship } from '../../Models/ShipInterface';

interface Spacetraders {
    agent: Agent | null,
    fleet: Ship[],
    updateAgent: (agent: Agent) => void,
    updateFleet: (fleet: Ship[]) => void,
}

export const SpacetradersContext = createContext<Spacetraders>({
    agent: null,
    fleet: [],
    updateAgent: () => { },
    updateFleet: () => { }
});