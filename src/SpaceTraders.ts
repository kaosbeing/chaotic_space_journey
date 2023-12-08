import { FleetData } from "./Interfaces/SpaceShipInterface";
import { UserData } from "./Interfaces/UserInterface";
export const token = localStorage.getItem("agent-token");

class SpaceTraders {
    static token = localStorage.getItem('token');

    static async getUser(): Promise<UserData> {
        const options = {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
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
                Authorization: `Bearer ${token}`
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