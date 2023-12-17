import { Agent } from "./AgentInterface";
import { Transaction } from "./MarketInterface";
import { Fuel } from "./ShipInterface";

export interface Refuel {
    agent: Agent,
    fuel: Fuel,
    transaction: Transaction
}
