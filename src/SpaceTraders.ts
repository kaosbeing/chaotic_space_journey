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
        const response = await SpaceTraders.get("https://api.spacetraders.io/v2/my/agent");
        return response.data;
    }

    static async getFleet(): Promise<Ship[]> {
        console.log("Fetching FLEET");
        const response = await SpaceTraders.get("https://api.spacetraders.io/v2/my/ships");
        return response.data;
    }

    static async getShip(shipSymbol: string): Promise<Ship> {
        console.log("Fetching SHIP");
        const response = await SpaceTraders.get(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}`);
        return response.data;
    }

    static async getMarket(systemSymbol: string, waypointSymbol: string): Promise<Market> {
        console.log("Fetching MARKET");
        const response = await SpaceTraders.get(`https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints/${waypointSymbol}/market`);
        return response.data;
    }

    static async getWaypoint(systemSymbol: string, waypointSymbol: string): Promise<Waypoint> {
        console.log("Fetching WAYPOINT");
        const response = await SpaceTraders.get(`https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints/${waypointSymbol}`);
        return response.data;
    }

    static async listWaypoints(systemSymbol: string, criterias?: { limit?: number, page?: number, type?: string, traits?: string }) {
        console.log("Fetching WAYPOINT LIST");
        let modifiers = "";

        if (criterias) {
            modifiers = "?";
            criterias.limit ? modifiers += `limit=${criterias.limit}&` : "";
            criterias.page ? modifiers += `page=${criterias.page}&` : "";
            criterias.type ? modifiers += `type=${criterias.type}&` : "";
            criterias.traits ? modifiers += `traits=${criterias.traits}&` : "";
        }

        let url = `https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints${modifiers}`;
        const response = await SpaceTraders.get(url);
        return response;

    }

    static async patchNav(shipSymbol: string, flightMode: string): Promise<Nav> {
        console.log("Patching NAV");
        const response = await SpaceTraders.patch(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}/nav`, `{"flightMode":"${flightMode}"}`);
        return response.data;
    }

    static async postExtract(shipSymbol: string): Promise<Extract> {
        console.log("Extracting RESSOURCES");
        const response = await SpaceTraders.post(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}/extract`, "");
        return response.data;
    }

    static async postRefuel(shipSymbol: string): Promise<Refuel> {
        console.log("REFUELLING");
        const response = await SpaceTraders.post(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}/refuel`, "");
        return response.data;
    }

    static async postOrbit(shipSymbol: string): Promise<Nav> {
        console.log("ORBITTING");
        const response = await SpaceTraders.post(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}/orbit`, "")
        return response.data.nav;
    }

    static async postDock(shipSymbol: string): Promise<Nav> {
        console.log("DOCKING");
        const response = await SpaceTraders.post(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}/dock`, "");
        return response.data.nav;
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