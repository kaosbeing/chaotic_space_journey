import { FleetData, Nav, ShipData } from "./Models/ShipInterface";
import { Waypoint } from "./Models/WaypointInterface";
import { AgentData } from "./Models/AgentInterface";
import { Market } from "./Models/MarketInterface";
import { Extract } from "./Models/ExtractInterface";

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

            return data.data;
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

            return data.data;
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

            return data.data;
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

            return data.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async patchNav(shipSymbol: string, flightMode: string): Promise<Nav> {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${SpaceTraders.token}`
            },
            body: `{"flightMode":"${flightMode}"}`
        };

        try {
            const response = await fetch(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}/nav`, options);
            const data = await response.json();
            console.log("Patching NAV");

            return data.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async postExtract(shipSymbol: string): Promise<Extract> {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${SpaceTraders.token}`
            },
            body: ''
        };

        try {
            const response = await fetch(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}/extract`, options);
            const data = await response.json();
            console.log("Extracting RESSOURCES");

            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default SpaceTraders;