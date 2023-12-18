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
        return await SpaceTraders.get("https://api.spacetraders.io/v2/my/agent");
    }

    static async getFleet(): Promise<Ship[]> {
        console.log("Fetching FLEET");
        return await SpaceTraders.get("https://api.spacetraders.io/v2/my/ships");
    }

    static async getShip(shipSymbol: string | undefined): Promise<Ship> {
        console.log("Fetching SHIP");
        return await SpaceTraders.get(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}`);
    }

    static async getMarket(systemSymbol: string | undefined, waypointSymbol: string | undefined): Promise<Market> {
        console.log("Fetching MARKET");
        return await SpaceTraders.get(`https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints/${waypointSymbol}/market`);
    }

    static async getWaypoint(systemSymbol: string | undefined, waypointSymbol: string | undefined): Promise<Waypoint> {
        console.log("Fetching WAYPOINT");
        return await SpaceTraders.get(`https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints/${waypointSymbol}`);
    }

    static async patchNav(shipSymbol: string, flightMode: string): Promise<Nav> {
        console.log("Patching NAV");
        return await SpaceTraders.patch(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}/nav`, `{"flightMode":"${flightMode}"}`);
    }

    static async postExtract(shipSymbol: string): Promise<Extract> {
        console.log("Extracting RESSOURCES");
        return await SpaceTraders.post(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}/extract`, "");
    }

    static async postRefuel(shipSymbol: string): Promise<Refuel> {
        console.log("REFUELLING");
        return await SpaceTraders.post(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}/refuel`, "");
    }

    static async postOrbit(shipSymbol: string): Promise<Nav> {
        console.log("ORBITTING");
        return await SpaceTraders.post(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}/orbit`, "")
    }

    static async postDock(shipSymbol: string): Promise<Nav> {
        console.log("DOCKING");
        return await SpaceTraders.post(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}/dock`, "");
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
            if (data.data) {
                return data.data;
            } else {
                return data.error;
            }
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
            if (data.data) {
                return data.data;
            } else {
                return data.error;
            }
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

            if (data.data) {
                return data.data;
            } else {
                return data.error;
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default SpaceTraders;