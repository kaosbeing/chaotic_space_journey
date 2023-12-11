import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CooldownComponent from "../cooldown/cooldown";
import { DashboardContext } from "../../Context/dashboard/DashboardContext";
import NavComponent from "../nav/nav";

import "./dashboard.css";
import { Cargo, Cooldown, Fuel, Nav, ShipData } from "../../Models/ShipInterface";
import { Waypoint } from "../../Models/WaypointInterface";
import { Market } from "../../Models/MarketInterface";
import SpaceTraders from "../../SpaceTraders";

const Dashboard = () => {
    const { shipSymbol } = useParams();

    const [ship, setShip] = useState<ShipData | null>()
    const [waypoint, setWaypoint] = useState<Waypoint | null>()
    const [market, setMarket] = useState<Market | null>()

    const [cargo, setCargo] = useState<Cargo | null>(null);
    const [nav, setNav] = useState<Nav | null>(null);
    const [cooldown, setCooldown] = useState<Cooldown | null>(null);
    const [fuel, setFuel] = useState<Fuel | null>(null);

    useEffect(() => {
        if (ship) {
            setCargo(ship.cargo);
            setNav(ship.nav);
            setCooldown(ship.cooldown);
            setFuel(ship.fuel);
        }
    }, [ship])

    useEffect(() => {
        const fetchData = async () => {
            setShip(await SpaceTraders.getShip(shipSymbol))
        }

        fetchData();
    }, [])

    const changeFlightMode = async (flightMode: string) => {
        if (shipSymbol) {
            let updatedNav = await SpaceTraders.patchNav(shipSymbol, flightMode);
            setNav(updatedNav);
        }
    }

    return (
        <div className="dashboard">
            <CooldownComponent cooldown={cooldown}></CooldownComponent>
            <NavComponent nav={nav} changeFlightMode={changeFlightMode}></NavComponent>
        </div>
    )
}

export default Dashboard;