import { Agent } from "./AgentInterface";
import { Transaction } from "./MarketInterface";
import { Cargo, Fuel, Nav, Ship } from "./ShipInterface";

export interface GenericSuccess {
    data: any,
    meta: any
}

export interface GenericError {
    error: any
}

export interface Navigate {
    fuel: Fuel,
    nav: Nav
}

export interface Trade {
    agent: Agent,
    cargo: Cargo,
    transaction: Transaction
}

export interface Purchaseship {
    agent: Agent,
    ship: Ship,
    transaction: Transaction
}

export interface Refuel {
    agent: Agent,
    fuel: Fuel,
    transaction: Transaction
}