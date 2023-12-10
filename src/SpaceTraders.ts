import { FleetData, ShipData } from "./Models/ShipInterface";
import { Waypoint } from "./Models/WaypointInterface";
import { AgentData } from "./Models/AgentInterface";
import { Market } from "./Models/MarketInterface";

class SpaceTraders {
    static token = localStorage.getItem("agent-token");

    static async getUser(): Promise<AgentData> {
        const options = {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${SpaceTraders.token}`
            },
        };

        try {
            const response = await fetch('https://api.spacetraders.io/v2/my/agent', options);
            const data = await response.json();
            console.log("Fetching AGENT");

            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getFleet(): Promise<FleetData> {
        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${SpaceTraders.token}`
            }
        };

        try {
            const response = await fetch("https://api.spacetraders.io/v2/my/ships", options);
            const data = await response.json();
            console.log("Fetching FLEET");

            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getShip(shipSymbol: string | undefined): Promise<ShipData> {
        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${SpaceTraders.token}`
            }
        };

        try {
            const response = await fetch(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}`, options);
            const data = await response.json();
            console.log("Fetching SHIP");

            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getMarket(systemSymbol: string | undefined, waypointSymbol: string | undefined): Promise<Market> {
        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${SpaceTraders.token}`
            }
        };

        try {
            const response = await fetch(`https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints/${waypointSymbol}/market`, options);
            const data = await response.json();
            console.log("Fetching MARKET");

            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getWaypoint(systemSymbol: string | undefined, waypointSymbol: string | undefined): Promise<Waypoint> {
        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${SpaceTraders.token}`
            }
        };

        try {
            const response = await fetch(`https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints/${waypointSymbol}`, options);
            const data = await response.json();
            console.log("Fetching WAYPOINT");

            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default SpaceTraders;