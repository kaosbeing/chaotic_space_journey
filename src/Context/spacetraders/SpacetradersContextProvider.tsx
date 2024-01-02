import { ReactElement, useContext, useEffect, useState } from 'react';
import { SpacetradersContext } from './SpacetradersContext';
import ApiHandler from '../../ApiHandler';
import { Agent } from '../../Models/AgentInterface';
import { Ship } from '../../Models/ShipInterface';
import { AuthContext } from '../auth/AuthContext';

interface SpacetradersProviderProps {
    children: ReactElement;
}

export function SpacetradersProvider({ children }: SpacetradersProviderProps) {
    const authContext = useContext(AuthContext);

    const [agent, setAgent] = useState<Agent | null>(null);
    const [fleet, setFleet] = useState<Ship[]>([]);

    useEffect(() => {
        let localAgent = localStorage.getItem("agent");
        let localFleet = localStorage.getItem("fleet");

        const fetchAgent = async () => {
            ApiHandler.getAgent(authContext.token);
        }

        const fetchFleet = async () => {
            ApiHandler.getFleet(authContext.token);
        }

        if (localAgent) {
            setAgent(JSON.parse(localAgent))
        } else {
            fetchAgent()
        }

        if (localFleet) {
            setFleet(JSON.parse(localFleet))
        } else {
            fetchFleet()
        }
    }, [])

    function updateAgent(agent: Agent) {
        setAgent(agent);
    }
    function updateFleet(fleet: Ship[]) {
        setFleet(fleet);
    }

    return <SpacetradersContext.Provider value={{ agent, fleet, updateAgent, updateFleet }}>
        {children}
    </SpacetradersContext.Provider>;
}