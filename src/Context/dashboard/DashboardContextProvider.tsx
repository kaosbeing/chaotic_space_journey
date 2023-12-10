import { ReactElement, useEffect, useState } from 'react';
import { DashboardContext } from './DashboardContext';
import SpaceTraders from '../../SpaceTraders';
import { ShipData } from '../../Models/ShipInterface';
import { Market } from '../../Models/MarketInterface';
import { Waypoint } from '../../Models/WaypointInterface';
import { useParams } from 'react-router-dom';

interface DashboardContextProviderProps {
    children: ReactElement;
}

export function DashboardContextProvider({ children }: DashboardContextProviderProps) {
    const [ship, setShip] = useState<ShipData | null>(null);
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
                setShip(shipData);
            }
            setDashboardData({
                ship: ship,
                waypoint: waypoint,
                market: market,
            });
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
            setDashboardData({
                ship: ship,
                waypoint: waypoint,
                market: market,
            });
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
                const marketData = await SpaceTraders.getMarket(ship?.nav.systemSymbol, ship?.nav.waypointSymbol);
                setMarket(marketData);
            }
            setDashboardData({
                ship: ship,
                waypoint: waypoint,
                market: market,
            });
        }

        fetchMarketData();
    }, [waypoint]);






    return <DashboardContext.Provider value={dashboardData}>
        {children}
    </DashboardContext.Provider>;
}