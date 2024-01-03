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

    function updateShip(ship: Ship) {
        const index = fleet.findIndex((fleet) => fleet.symbol === ship.symbol);
        if (index !== -1) {
            const updatedFleet = [...fleet];
            updatedFleet[index] = ship;
            setFleet(updatedFleet);
        }
    }

    const changeFlightMode = async (ship: Ship, flightMode: string) => {
        let response = await ApiHandler.patchNav(ship.symbol, flightMode, authContext.token);
        updateShip({ ...ship, nav: response })
    }

    const extractRessources = async (ship: Ship) => {
        if (ship) {
            let response = await ApiHandler.postExtract(ship.symbol, authContext.token);
            updateShip({ ...ship, cargo: response.cargo, cooldown: response.cooldown });
        }

        // result of extraction : response.extraction (a mettre dans une notif plus tard)
    }

    const refuelShip = async (ship: Ship) => {
        if (ship) {
            let response = await ApiHandler.postRefuel(ship.symbol, authContext.token);
            updateShip({ ...ship, fuel: response.fuel });
        }
    }

    const changeNavStatus = async (ship: Ship, action: string) => {
        if (ship) {

            if (action === "DOCK") {
                let response = await ApiHandler.postDock(ship.symbol, authContext.token);
                updateShip({ ...ship, nav: response });
            } else if (action === "ORBIT") {
                let response = await ApiHandler.postOrbit(ship.symbol, authContext.token);
                updateShip({ ...ship, nav: response });
            }
        }
    }

    const navigate = async (ship: Ship, waypointSymbol: string) => {
        const response = await ApiHandler.postNavigate(ship.symbol, waypointSymbol, authContext.token)
        updateShip({ ...ship, fuel: response.fuel, nav: response.nav });
    }

    return <SpacetradersContext.Provider value={{ agent, fleet, updateAgent, updateFleet, updateShip, changeFlightMode, extractRessources, refuelShip, changeNavStatus, navigate }}>
        {children}
    </SpacetradersContext.Provider>;
}