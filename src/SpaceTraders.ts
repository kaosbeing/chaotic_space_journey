import { FleetData } from "./Models/ShipInterface";
import { AgentData } from "./Models/AgentInterface";

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
            console.log(data);
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
            console.log(data);
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default SpaceTraders;