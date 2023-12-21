import { Nav, Ship } from "./Models/ShipInterface";
import { Waypoint } from "./Models/WaypointInterface";
import { Agent } from "./Models/AgentInterface";
import { Market } from "./Models/MarketInterface";
import { Extract } from "./Models/ExtractInterface";
import { Refuel } from "./Models/RefuelInterface";

class SpaceTraders {
    static token = localStorage.getItem("agent-token");

    static async getUser(): Promise<Agent> {
        console.log("Fetching AGENT");
        const data = await SpaceTraders.get("https://api.spacetraders.io/v2/my/agent");
        return data.data;
    }

    static async getFleet(): Promise<Ship[]> {
        console.log("Fetching FLEET");
        const data = await SpaceTraders.get("https://api.spacetraders.io/v2/my/ships");
        return data.data;
    }

    static async getShip(shipSymbol: string | undefined): Promise<Ship> {
        console.log("Fetching SHIP");
        const data = await SpaceTraders.get(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}`);
        return data.data;
    }

    static async getMarket(systemSymbol: string | undefined, waypointSymbol: string | undefined): Promise<Market> {
        console.log("Fetching MARKET");
        const data = await SpaceTraders.get(`https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints/${waypointSymbol}/market`);
        return data.data;
    }

    static async getWaypoint(systemSymbol: string | undefined, waypointSymbol: string | undefined): Promise<Waypoint> {
        console.log("Fetching WAYPOINT");
        const data = await SpaceTraders.get(`https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints/${waypointSymbol}`);
        return data.data;
    }

    static async patchNav(shipSymbol: string, flightMode: string): Promise<Nav> {
        console.log("Patching NAV");
        const data = await SpaceTraders.patch(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}/nav`, `{"flightMode":"${flightMode}"}`);
        return data.data;
    }

    static async postExtract(shipSymbol: string): Promise<Extract> {
        console.log("Extracting RESSOURCES");
        const data = await SpaceTraders.post(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}/extract`, "");
        return data.data;
    }

    static async postRefuel(shipSymbol: string): Promise<Refuel> {
        console.log("REFUELLING");
        const data = await SpaceTraders.post(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}/refuel`, "");
        return data.data;
    }

    static async postOrbit(shipSymbol: string): Promise<Nav> {
        console.log("ORBITTING");
        const data = await SpaceTraders.post(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}/orbit`, "")
        return data.data;
    }

    static async postDock(shipSymbol: string): Promise<Nav> {
        console.log("DOCKING");
        const data = await SpaceTraders.post(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}/dock`, "");
        return data.data;
    }

    static async get(url: string) {
        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${SpaceTraders.token}`
            }
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async post(url: string, body: string) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${SpaceTraders.token}`
            },
            body: body
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async patch(url: string, body: string) {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${SpaceTraders.token}`
            },
            body: body
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default SpaceTraders;