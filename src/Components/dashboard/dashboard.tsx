import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CooldownComponent from "../cooldown/cooldown";
import NavComponent from "../nav/nav";
import FuelComponent from "../fuel/fuel";
import WaypointComponent from "../waypoint/waypoint";

import "./dashboard.css";
import "../../assets/css/loader.css"
import { Cooldown, Fuel, Nav, ShipData } from "../../Models/ShipInterface";
import { Waypoint as WaypointData } from "../../Models/WaypointInterface";
import SpaceTraders from "../../SpaceTraders";

const Dashboard = () => {
    const { shipSymbol } = useParams();

    const [ship, setShip] = useState<ShipData | null>(null)
    const [waypoint, setWaypoint] = useState<WaypointData | null>(null)
    // use state Waypoint
    // use state Market

    //const [cargo, setCargo] = useState<Cargo | null>(null);
    const [nav, setNav] = useState<Nav | null>(null);
    const [cooldown, setCooldown] = useState<Cooldown | null>(null);
    const [fuel, setFuel] = useState<Fuel | null>(null);

    useEffect(() => {
        const fetchWaypoint = async () => {
            setWaypoint(await SpaceTraders.getWaypoint(ship?.nav.systemSymbol, ship?.nav.waypointSymbol));
        }

        if (ship) {
            setNav(ship.nav);
            setCooldown(ship.cooldown);
            setFuel(ship.fuel);
            fetchWaypoint();
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

    const extractRessources = async (shipSymbol: string) => {
        if (shipSymbol) {
            let response = await SpaceTraders.postExtract(shipSymbol);
            //setCargo(response.cargo);
            setCooldown(response.cooldown);

            // result of extraction : response.extraction (a mettre dans une notif plus tard)
        }
    }

    return (
        <>
            {
                ship && waypoint ? (
                    <div className="dashboard">
                        <CooldownComponent cooldown={cooldown}></CooldownComponent>
                        <NavComponent nav={nav} changeFlightMode={changeFlightMode}></NavComponent>
                        <FuelComponent fuel={fuel} ></FuelComponent>
                        <WaypointComponent waypoint={waypoint} extract={extractRessources}></WaypointComponent>
                    </div >
                ) : (
                    <div className="dashboard loading">
                        <div className="loader loader--big"></div>
                    </div >
                )
            }
        </>
    )
}

export default Dashboard;