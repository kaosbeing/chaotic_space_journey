import { Nav, Ship } from "./Models/ShipInterface";
import { Waypoint } from "./Models/WaypointInterface";
import { Agent } from "./Models/AgentInterface";
import { Market } from "./Models/MarketInterface";
import { Extract } from "./Models/ExtractInterface";
import { Refuel } from "./Models/RefuelInterface";

class ApiHandler {
    static token = localStorage.getItem("agent-token");

    static async getAgent(token: string): Promise<Agent> {
        console.log("Fetching AGENT");
        const response = await ApiHandler.get("https://api.spacetraders.io/v2/my/agent", token);
        return response.data;
    }

    static async getFleet(token: string): Promise<Ship[]> {
        console.log("Fetching FLEET");
        const response = await ApiHandler.get("https://api.spacetraders.io/v2/my/ships", token);
        return response.data;
    }

    static async getShip(shipSymbol: string, token: string): Promise<Ship> {
        console.log("Fetching SHIP");
        const response = await ApiHandler.get(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}`, token);
        return response.data;
    }

    static async getMarket(systemSymbol: string, waypointSymbol: string, token: string): Promise<Market> {
        console.log("Fetching MARKET");
        const response = await ApiHandler.get(`https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints/${waypointSymbol}/market`, token);
        return response.data;
    }

    static async getShipyard(systemSymbol: string, waypointSymbol: string, token: string) {
        console.log("fetching SHIPYARD");
        const response = await ApiHandler.get(`https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints/${waypointSymbol}/shipyard`, token);
        return response.data;
    }

    static async getWaypoint(systemSymbol: string, waypointSymbol: string, token: string): Promise<Waypoint> {
        console.log("Fetching WAYPOINT");
        const response = await ApiHandler.get(`https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints/${waypointSymbol}`, token);
        return response.data;
    }

    static async listWaypoints(systemSymbol: string, token: string, criterias?: { limit?: number, page?: number, type?: string, traits?: string }) {
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
        const response = await ApiHandler.get(url, token);
        return response;

    }

    static async patchNav(shipSymbol: string, flightMode: string, token: string): Promise<Nav> {
        console.log("Patching NAV");
        const response = await ApiHandler.patch(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}/nav`, token, `{"flightMode":"${flightMode}"}`);
        return response.data;
    }

    static async postExtract(shipSymbol: string, token: string): Promise<Extract> {
        console.log("Extracting RESSOURCES");
        const response = await ApiHandler.post(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}/extract`, token);
        return response.data;
    }

    static async postRefuel(shipSymbol: string, token: string): Promise<Refuel> {
        console.log("REFUELLING");
        const response = await ApiHandler.post(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}/refuel`, token);
        return response.data;
    }

    static async postOrbit(shipSymbol: string, token: string): Promise<Nav> {
        console.log("ORBITTING");
        const response = await ApiHandler.post(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}/orbit`, token)
        return response.data.nav;
    }

    static async postDock(shipSymbol: string, token: string): Promise<Nav> {
        console.log("DOCKING");
        const response = await ApiHandler.post(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}/dock`, token);
        return response.data.nav;
    }

    static async postNavigate(shipSymbol: string, waypointSymbol: string, token: string) {
        console.log("NAVIGATING");
        const response = await ApiHandler.post(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}/navigate`, token, `{"waypointSymbol": "${waypointSymbol}"}`);
        return response.data;
    }

    static async postBuy(shipSymbol: string, goodSymbol: string, units: number, token: string) {
        console.log("BUYING " + goodSymbol);
        const response = await ApiHandler.post(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}/purchase`, token, `{"symbol":"${goodSymbol}","units":${units}}`);
        return response.data;
    }

    static async postSell(shipSymbol: string, goodSymbol: string, units: number, token: string) {
        console.log("SELLING " + goodSymbol);
        const response = await ApiHandler.post(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}/sell`, token, `{"symbol":"${goodSymbol}","units":${units}}`);
        return response.data;
    }

    static async postBuyShip(shipType: string, waypointSymbol: string, token: string) {
        console.log("BUYING ship");
        const response = await ApiHandler.post(`https://api.spacetraders.io/v2/my/ships/`, token, `{"shipType":"${shipType}","waypointSymbol":"${waypointSymbol}"}`);
        return response.data;
    }

    static async get(url: string, token: string) {
        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
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

    static async post(url: string, token: string, body: string = "") {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
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

    static async patch(url: string, token: string, body: string) {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
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

export default ApiHandler;