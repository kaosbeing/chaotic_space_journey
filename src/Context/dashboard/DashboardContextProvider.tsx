import { ReactElement, useEffect, useState } from 'react';
import { DashboardContext } from './DashboardContext';
import SpaceTraders from '../../SpaceTraders';
import { Cargo, Cooldown, Fuel, Nav, ShipData } from '../../Models/ShipInterface';
import { Market } from '../../Models/MarketInterface';
import { Waypoint } from '../../Models/WaypointInterface';
import { useParams } from 'react-router-dom';

interface DashboardContextProviderProps {
    children: ReactElement;
}

interface PartialShip {
    symbol: String | null,
    cargo: Cargo | null,
    nav: Nav | null,
    cooldown: Cooldown | null,
    fuel: Fuel | null,
}

export function DashboardContextProvider({ children }: DashboardContextProviderProps) {
    const [cargo, setCargo] = useState<Cargo | null>(null);
    const [nav, setNav] = useState<Nav | null>(null);
    const [cooldown, setCooldown] = useState<Cooldown | null>(null);
    const [fuel, setFuel] = useState<Fuel | null>(null);
    const [symbol, setSymbol] = useState<String | null>(null);

    const [ship, setShip] = useState<PartialShip | null>({
        symbol: symbol,
        cargo: cargo,
        nav: nav,
        cooldown: cooldown,
        fuel: fuel,
    });
    const [waypoint, setWaypoint] = useState<Waypoint | null>(null);
    const [market, setMarket] = useState<Market | null>(null);

    const [dashboardData, setDashboardData] = useState({
        ship: ship,
        waypoint: waypoint,
        market: market,
    });

    let { shipSymbol } = useParams();

    useEffect(() => {
        console.log("Dashboard Update : Ship");

        const fetchShipData = async () => {
            if (shipSymbol && (ship?.symbol != shipSymbol)) {
                const shipData = await SpaceTraders.getShip(shipSymbol);
                setNav(shipData.nav);
                setCargo(shipData.cargo);
                setCooldown(shipData.cooldown);
                setFuel(shipData.fuel);
                setSymbol(shipData.symbol);

                setShip({ symbol: symbol, nav: nav, cargo: cargo, cooldown: cooldown, fuel: fuel });
            }
        }

        if (shipSymbol && (ship?.symbol != shipSymbol)) {
            fetchShipData();
        }
    }, [shipSymbol]);

    useEffect(() => {
        console.log("Dashboard Update : Waypoint");

        const fetchWaypointData = async () => {
            console.log(ship);

            if (ship?.nav) {
                const waypointData = await SpaceTraders.getWaypoint(ship.nav.systemSymbol, ship.nav.waypointSymbol)
                setWaypoint(waypointData);
            }
        }

        fetchWaypointData();
    }, [ship]);

    useEffect(() => {
        console.log("Dashboard Update : Market");

        const fetchMarketData = async () => {
            const marketplaceTrait = {
                "symbol": "MARKETPLACE",
                "name": "Marketplace",
                "description": "A thriving center of commerce where traders from across the galaxy gather to buy, sell, and exchange goods."
            };

            if (waypoint?.traits.includes(marketplaceTrait)) {
                const marketData = await SpaceTraders.getMarket(ship?.nav?.systemSymbol, ship?.nav?.waypointSymbol);
                setMarket(marketData);
            }
        }

        fetchMarketData();
    }, [waypoint]);






    return <DashboardContext.Provider value={dashboardData}>
        {children}
    </DashboardContext.Provider>;
}