import { Nav, Ship } from "./Models/ShipInterface";
import { Waypoint } from "./Models/WaypointInterface";
import { Agent } from "./Models/AgentInterface";
import { Market } from "./Models/MarketInterface";
import { Extract } from "./Models/ExtractInterface";
import { toast } from 'react-toastify';
import { Shipyard } from "./Models/ShipyardInterface";
import { Navigate, Purchaseship, Trade, Refuel, GenericSuccess } from "./Models/ApiInterface";

class ApiHandler {
    static token = localStorage.getItem("agent-token");

    static async getAgent(token: string): Promise<Agent | null> {
        console.log("Fetching AGENT");
        try {
            const response = ApiHandler.handleResponse(await ApiHandler.get("https://api.spacetraders.io/v2/my/agent", token));
            return response ? response.data : response;
        } catch (err) {
            toast.error(err as string);
            return null;
        }
    }

    static async getFleet(token: string): Promise<Ship[] | null> {
        console.log("Fetching FLEET");
        try {
            const response = ApiHandler.handleResponse(await ApiHandler.get("https://api.spacetraders.io/v2/my/ships", token));
            return response ? response.data : null;
        } catch (err) {
            toast.error(err as string);
            return null;
        }
    }

    static async getShip(shipSymbol: string, token: string): Promise<Ship | null> {
        console.log("Fetching SHIP");
        try {
            const response = ApiHandler.handleResponse(await ApiHandler.get(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}`, token));
            return response ? response.data : null;
        } catch (err) {
            toast.error(err as string);
            return null;
        }
    }

    static async getMarket(systemSymbol: string, waypointSymbol: string, token: string): Promise<Market | null> {
        console.log("Fetching MARKET");
        try {
            const response = ApiHandler.handleResponse(await ApiHandler.get(`https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints/${waypointSymbol}/market`, token));
            return response ? response.data : null;
        } catch (err) {
            toast.error(err as string);
            return null;
        }
    }

    static async getShipyard(systemSymbol: string, waypointSymbol: string, token: string): Promise<Shipyard | null> {
        console.log("fetching SHIPYARD");
        try {
            const response = ApiHandler.handleResponse(await ApiHandler.get(`https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints/${waypointSymbol}/shipyard`, token));
            return response ? response.data : null;
        } catch (err) {
            toast.error(err as string);
            return null;
        }
    }

    static async getWaypoint(systemSymbol: string, waypointSymbol: string, token: string): Promise<Waypoint | null> {
        console.log("Fetching WAYPOINT");
        try {
            const response = ApiHandler.handleResponse(await ApiHandler.get(`https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints/${waypointSymbol}`, token));
            return response ? response.data : null;
        } catch (err) {
            toast.error(err as string);
            return null;
        }
    }

    static async listWaypoints(systemSymbol: string, token: string, criterias?: { limit?: number, page?: number, type?: string, traits?: string }): Promise<GenericSuccess | null> {
        console.log("Fetching WAYPOINT LIST");
        const modifiers = new URLSearchParams();
        if (criterias) {
            if (criterias.limit) { modifiers.set("limit", criterias.limit.toString()) }
            if (criterias.page) { modifiers.set("page", criterias.page.toString()) }
            if (criterias.type) { modifiers.set("type", criterias.type) }
            if (criterias.traits) { modifiers.set("traits", criterias.traits) }
        }

        const url = `https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints${modifiers}`;
        try {
            const response = ApiHandler.handleResponse(await ApiHandler.get(url, token));
            return response ? response : null;
        } catch (err) {
            toast.error(err as string);
            return null;
        }
    }

    static async patchNav(shipSymbol: string, flightMode: string, token: string): Promise<Nav | null> {
        console.log("Patching NAV");
        try {
            const response = ApiHandler.handleResponse(await ApiHandler.patch(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}/nav`, token, `{"flightMode":"${flightMode}"}`));
            return response ? response.data : null;
        } catch (err) {
            toast.error(err as string);
            return null;
        }
    }

    static async postExtract(shipSymbol: string, token: string): Promise<Extract | null> {
        console.log("Extracting RESSOURCES");
        try {
            const response = ApiHandler.handleResponse(await ApiHandler.post(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}/extract`, token));
            return response ? response.data : null;
        } catch (err) {
            toast.error(err as string);
            return null;
        }
    }

    static async postRefuel(shipSymbol: string, token: string): Promise<Refuel | null> {
        console.log("REFUELLING");
        try {
            const response = ApiHandler.handleResponse(await ApiHandler.post(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}/refuel`, token));
            return response ? response.data : null;
        } catch (err) {
            toast.error(err as string);
            return null;
        }
    }

    static async postOrbit(shipSymbol: string, token: string): Promise<Nav | null> {
        console.log("ORBITTING");
        try {
            const response = ApiHandler.handleResponse(await ApiHandler.post(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}/orbit`, token));
            return response ? response.data : null;
        } catch (err) {
            toast.error(err as string);
            return null;
        }
    }

    static async postDock(shipSymbol: string, token: string): Promise<Nav | null> {
        console.log("DOCKING");
        try {
            const response = ApiHandler.handleResponse(await ApiHandler.post(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}/dock`, token));
            return response ? response.data.nav : null;
        } catch (err) {
            toast.error(err as string);
            return null;
        }
    }

    static async postNavigate(shipSymbol: string, waypointSymbol: string, token: string): Promise<Navigate | null> {
        console.log("NAVIGATING");
        try {
            const response = ApiHandler.handleResponse(await ApiHandler.post(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}/navigate`, token, `{"waypointSymbol": "${waypointSymbol}"}`));
            return response ? response.data : null;
        } catch (err) {
            toast.error(err as string);
            return null;
        }
    }

    static async postBuy(shipSymbol: string, goodSymbol: string, units: number, token: string): Promise<Trade | null> {
        console.log("BUYING " + goodSymbol);
        try {
            const response = ApiHandler.handleResponse(await ApiHandler.post(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}/purchase`, token, `{"symbol":"${goodSymbol}","units":${units}}`));
            return response ? response.data : null;
        } catch (err) {
            toast.error(err as string);
            return null;
        }
    }

    static async postSell(shipSymbol: string, goodSymbol: string, units: number, token: string): Promise<Trade | null> {
        console.log("SELLING " + goodSymbol);
        try {
            const response = ApiHandler.handleResponse(await ApiHandler.post(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}/sell`, token, `{"symbol":"${goodSymbol}","units":${units}}`));
            return response ? response.data : null;
        } catch (err) {
            toast.error(err as string);
            return null;
        }
    }

    static async postBuyShip(shipType: string, waypointSymbol: string, token: string): Promise<Purchaseship | null> {
        console.log("BUYING ship");
        try {
            const response = ApiHandler.handleResponse(await ApiHandler.post(`https://api.spacetraders.io/v2/my/ships/`, token, `{"shipType":"${shipType}","waypointSymbol":"${waypointSymbol}"}`));
            return response ? response.data : null;
        } catch (err) {
            toast.error(err as string);
            return null;
        }
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

    static handleResponse(response: any): GenericSuccess | null {
        if (response.data) {
            return response;
        } else if (response.error) {
            toast.error(response.error.message)
            return null;
        } else {
            toast.error("Unknown error ! (⊙_⊙)?")
            return null;
        }
    }
}

export default ApiHandler;