import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CooldownComponent from "../cooldown/cooldown";
import NavComponent from "../nav/nav";
import FuelComponent from "../fuel/fuel";
import WaypointComponent from "../waypoint/waypoint";
import ShipOverview from "../shipOverview/shipOverview";

import "./dashboard.css";
import "../../assets/css/loader.css"
import { Cargo, Cooldown, Fuel, Nav, ShipData } from "../../Models/ShipInterface";
import { Waypoint as WaypointData } from "../../Models/WaypointInterface";
import SpaceTraders from "../../SpaceTraders";
import refreshIcon from "../../assets/icons/refresh.svg";
import { Market } from "../../Models/MarketInterface";

const Dashboard = () => {
    const { shipSymbol } = useParams();

    const [ship, setShip] = useState<ShipData | null>(null)
    const [waypoint, setWaypoint] = useState<WaypointData | null>(null)
    const [market, setMarket] = useState<Market | null>(null);

    const [cargo, setCargo] = useState<Cargo | null>(null);
    const [nav, setNav] = useState<Nav | null>(null);
    const [cooldown, setCooldown] = useState<Cooldown | null>(null);
    const [fuel, setFuel] = useState<Fuel | null>(null);

    const fetchData = async () => {
        setShip(await SpaceTraders.getShip(shipSymbol))
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        if (ship) {
            const fetchWaypoint = async () => {
                setWaypoint(await SpaceTraders.getWaypoint(ship.nav.systemSymbol, ship.nav.waypointSymbol));
            }

            setNav(ship.nav);
            setCooldown(ship.cooldown);
            setFuel(ship.fuel);
            setCargo(ship.cargo);
            fetchWaypoint();
        }
    }, [ship])

    useEffect(() => {
        if (waypoint && ship && waypoint.traits.some((trait) => trait.symbol == "MARKETPLACE")) {
            const fetchMarket = async () => {
                setMarket(await SpaceTraders.getMarket(ship.nav.systemSymbol, ship.nav.waypointSymbol));
            }

            fetchMarket();
        }
    }, [waypoint])

    const changeFlightMode = async (flightMode: string) => {
        if (shipSymbol) {
            let updatedNav = await SpaceTraders.patchNav(shipSymbol, flightMode);
            setNav(updatedNav);
        }
    }

    const extractRessources = async (shipSymbol: string) => {
        let response = await SpaceTraders.postExtract(shipSymbol);
        setCargo(response.cargo);
        setCooldown(response.cooldown);

        // result of extraction : response.extraction (a mettre dans une notif plus tard)
    }

    const refuelShip = async (shipSymbol: string) => {
        let response = await SpaceTraders.postRefuel(shipSymbol);
        setFuel(response.fuel);
    }

    const changeNavStatus = async (action: string, shipSymbol: string) => {
        if (action === "DOCK") {
            let response = await SpaceTraders.postDock(shipSymbol);
            setNav(response);
        } else if (action === "ORBIT") {
            let response = await SpaceTraders.postOrbit(shipSymbol);
            setNav(response)
        }
    }

    return (
        <div className="dashboard">
            <header className="dashboard__header">
                <h2 className="dashboard__title">Dashboard</h2>
                <button onClick={fetchData} className="dashboard__refresh"><img src={refreshIcon} alt="" /></button>
            </header>
            {
                ship && waypoint ? (
                    <div className="dashboard__content">
                        <ShipOverview symbol={ship.symbol} cargo={cargo} cooldown={cooldown} fuel={fuel} frame={ship.frame}></ShipOverview>
                        <NavComponent nav={nav} changeFlightMode={changeFlightMode} changeNavStatus={changeNavStatus}></NavComponent>
                        <WaypointComponent waypoint={waypoint} market={market} nav={nav} extract={extractRessources} refuel={refuelShip}></WaypointComponent>
                    </div >
                ) : (
                    <div className="dashboard__content loading">
                        <div className="loader loader--big"></div>
                    </div >
                )
            }
        </div>
    )
}

export default Dashboard;