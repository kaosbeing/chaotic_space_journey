import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SpaceTraders from "../../SpaceTraders";
import NavComponent from "../nav/nav";
import LocationComponent from "../location/location";
import ShipOverview from "../shipOverview/shipOverview";
import CargoComponent from "../cargo/cargo";
import WaypointList from "../waypointList/waypointList";

import "./dashboard.css";
import "../../css/loader.css"
import { Cargo, Cooldown, Fuel, Nav, Ship } from "../../Models/ShipInterface";
import { Waypoint as WaypointData } from "../../Models/WaypointInterface";
import { Market } from "../../Models/MarketInterface";
import refreshIcon from "/assets/icons/refresh.svg";
import Marketplace from "../marketplace/marketplace";

const Dashboard = () => {
    const { shipSymbol } = useParams();

    const [ship, setShip] = useState<Ship | null>(null)
    const [waypoint, setWaypoint] = useState<WaypointData | null>(null)
    const [market, setMarket] = useState<Market | null>(null);

    const [cargo, setCargo] = useState<Cargo | null>(null);
    const [nav, setNav] = useState<Nav | null>(null);
    const [cooldown, setCooldown] = useState<Cooldown | null>(null);
    const [fuel, setFuel] = useState<Fuel | null>(null);

    const fetchShip = async () => {
        if (shipSymbol) {
            setShip(await SpaceTraders.getShip(shipSymbol))
        }
    }

    // Fetch ship on load
    useEffect(() => {
        fetchShip();
    }, [])

    // Once ship is fetched, fetch ship
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

    // If ship is at waypoint with marketplace, fetch market
    useEffect(() => {
        if (waypoint && ship && waypoint.traits.some((trait) => trait.symbol == "MARKETPLACE")) {
            const fetchMarket = async () => {
                setMarket(await SpaceTraders.getMarket(ship.nav.systemSymbol, ship.nav.waypointSymbol));
            }

            fetchMarket();
        }
    }, [waypoint])

    // If anything changes, store it in localstorage
    useEffect(() => {
        let data = {
            waypoint: waypoint,
            market: market,
            cargo: cargo,
            nav: nav,
            cooldown: cooldown,
            fuel: fuel
        }

        if (shipSymbol) {
            localStorage.setItem(shipSymbol, JSON.stringify(data));
        }
    }, [waypoint, market, cargo, nav, cooldown, fuel])

    // Get all infos from localstorage if there is
    useEffect(() => {
        if (shipSymbol && localStorage.getItem(shipSymbol)) {
            let localData = localStorage.getItem(shipSymbol);
            if (localData) {
                let shipData = JSON.parse(localData);

                setNav(shipData.nav);
                setCooldown(shipData.cooldown);
                setFuel(shipData.fuel);
                setCargo(shipData.cargo);
                setWaypoint(shipData.waypoint);
                setMarket(shipData.market);
            }
        }
    }, [shipSymbol])

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

    const navigate = async (waypointSymbol: string) => {
        if (shipSymbol) {
            const response = await SpaceTraders.postNavigate(shipSymbol, waypointSymbol)
            setFuel(response.fuel);
            setNav(response.nav);
        }
    }

    return (
        <div className="dashboard">
            <header className="dashboard__header">
                <h2 className="dashboard__title">Dashboard</h2>
                <button onClick={fetchShip} className="dashboard__refresh"><img src={refreshIcon} alt="" /></button>
            </header>
            {
                ship && waypoint ? (
                    <div className="dashboard__content">
                        <Marketplace market={market}></Marketplace>
                        <ShipOverview symbol={ship.symbol} cargo={cargo} cooldown={cooldown} fuel={fuel} frame={ship.frame}></ShipOverview>
                        <NavComponent nav={nav} changeFlightMode={changeFlightMode} changeNavStatus={changeNavStatus}></NavComponent>
                        <LocationComponent waypoint={waypoint} market={market} nav={nav} extract={extractRessources} refuel={refuelShip}></LocationComponent>
                        <CargoComponent cargo={cargo}></CargoComponent>
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