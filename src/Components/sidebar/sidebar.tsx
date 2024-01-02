import "./sidebar.css";
import { Ship, Ship as ShipData } from '../../Models/ShipInterface';
import User from '../user/user';
import logo from "/assets/logo.svg";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/auth/AuthContext";
import { Link } from "react-router-dom";
import ProgressBar from "../progressBar/progressBar";

import chevron from "/assets/icons/chevron_right.svg";
import dockedIcon from "/assets/icons/docked.svg";
import in_orbitIcon from "/assets/icons/in_orbit.svg";
import in_transitIcon from "/assets/icons/in_transit.svg";
import locationIcon from "/assets/icons/location.svg";
import { SpacetradersContext } from "../../Context/spacetraders/SpacetradersContext";

const Sidebar = () => {
    const authContext = useContext(AuthContext);
    const STContext = useContext(SpacetradersContext);
    const [timeUntilArrival, setTimeUntilArrival] = useState<number>(0);
    const [flightProgress, setFlightProgress] = useState<number>(0);
    let timer: NodeJS.Timeout;

    const calculateTimeAndProgress = (ship: Ship) => {
        let departureDate = new Date(ship.nav.route.departureTime);
        let arrivalDate = new Date(ship.nav.route.arrival);

        const currentTime = Date.now();
        const timeUntilArrival = Math.floor((arrivalDate.getTime() - currentTime) / 1000);
        const flightProgress = Math.floor(100 * (currentTime - departureDate.getTime()) / (arrivalDate.getTime() - departureDate.getTime()));

        setTimeUntilArrival(timeUntilArrival);
        setFlightProgress(flightProgress);

        if (timeUntilArrival <= 0) {
            clearInterval(timer);
            const editedShipData = { ...ship, nav: { ...ship.nav, status: "IN_ORBIT" } };
            STContext.updateShip(editedShipData);
        }
    };

    const renderTransitInfos = (ship: ShipData) => {
        let departureDate = new Date(ship.nav.route.departureTime);
        let arrivalDate = new Date(ship.nav.route.arrival);

        if (ship.nav.status === "IN_TRANSIT") {
            return (
                <div className='fleetItem__travelStatus'>
                    <span className='fleetItem__timer'>{timeUntilArrival}s</span>
                    <ProgressBar max={100} value={flightProgress} color='var(--confirm)'></ProgressBar>
                    <div className='fleetItem__transitTiming'>
                        <span className='fleetItem__departureTime'>{departureDate.toLocaleString("fr-FR").replace("/2023", "")}</span>
                        <span className='fleetItem__arrivalTime'>{arrivalDate.toLocaleString("fr-FR").replace("/2023", "")}</span>
                    </div>
                </div>
            )
        }
    }

    useEffect(() => {
        STContext.fleet?.map((ship: Ship) => {
            calculateTimeAndProgress(ship);

            timer = setInterval(() => {
                calculateTimeAndProgress(ship);
            }, 1000);
        })

        return () => clearInterval(timer); // Cleanup interval on component unmount
    }, []); // Empty dependency array to run useEffect only once on mount

    const renderStatusIcon = (ship: ShipData) => {
        switch (ship.nav.status) {
            case "DOCKED":
                return <img className='fleetItem__status' src={dockedIcon} alt="DOCKED" />
            case "IN_ORBIT":
                return <img className='fleetItem__status' src={in_orbitIcon} alt="IN_ORBIT" />
            case "IN_TRANSIT":
                return <img className='fleetItem__status' src={in_transitIcon} alt="IN_TRANSIT" />
            default:
                return <img className='fleetItem__status' src="" alt="UNKNOWN" />
        }
    }

    return (
        <div className='sideBar'>
            <div className="hero">
                <img className="hero__img" src={logo} alt="" />
                <div className="hero__title">
                    <span className="hero__title--main">Chaotic</span>
                    <span className="hero__title--sub">Space Journey</span>
                </div>
            </div>
            <Link to={"/fleet"} className="full_fleet">
                <span>Full fleet</span>
                <img src={chevron} />
            </Link>
            {STContext.fleet ? (
                <div className="fleet">
                    {STContext.fleet.map((ship: ShipData) => (
                        <Link key={ship.symbol} to={"/fleet/" + ship.symbol} className='fleetItem'>
                            <div className='fleetItem__header'>
                                <span className='fleetItem__symbol'>{ship.registration.role.charAt(0).toUpperCase() + ship.registration.role.slice(1).toLowerCase()} {ship.frame.name}</span>
                                {renderStatusIcon(ship)}
                            </div>
                            <div className='fleetItem__location'>
                                <img className='fleetItem__locationIcon' src={locationIcon} alt="" />
                                <span className='fleetItem__waypointSymbol'>{ship.nav.waypointSymbol}</span>
                            </div>
                            {renderTransitInfos(ship)}
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="fleet loading">
                    <div className="loader"></div>
                </div>
            )}
            <User user={STContext.agent} />
            <button onClick={() => { authContext.logout() }} className="logout">Log out</button>
        </div>
    );
};

export default Sidebar;