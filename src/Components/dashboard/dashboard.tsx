import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CooldownComponent from "../cooldown/cooldown";
import NavComponent from "../nav/nav";
import FuelComponent from "../fuel/fuel";

import "./dashboard.css";
import "../../assets/css/loader.css"
import { Cooldown, Fuel, Nav, ShipData } from "../../Models/ShipInterface";
import SpaceTraders from "../../SpaceTraders";

const Dashboard = () => {
    const { shipSymbol } = useParams();

    const [ship, setShip] = useState<ShipData | null>()
    // use state Waypoint
    // use state Market

    // use state Cargo
    const [nav, setNav] = useState<Nav | null>(null);
    const [cooldown, setCooldown] = useState<Cooldown | null>(null);
    const [fuel, setFuel] = useState<Fuel | null>(null);

    useEffect(() => {
        if (ship) {
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
        <div className="dashboard" >
            {
                ship ? (
                    <>
                        <CooldownComponent cooldown={cooldown}></CooldownComponent>
                        <NavComponent nav={nav} changeFlightMode={changeFlightMode}></NavComponent>
                        <FuelComponent fuel={fuel} ></FuelComponent>
                    </>
                ) : (
                    <div className="loader"></div>
                )
            }
        </div >
    )
}

export default Dashboard;