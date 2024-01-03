import "./nav.css";
import "/assets/icons/nav.svg";
import ProgressBar from "../progressBar/progressBar";
import { useState } from "react";
import { Ship } from "../../Models/ShipInterface";

import navIcon from "/assets/icons/nav.svg";
import systemIcon from "/assets/icons/system.svg";
import waypointIcon from "/assets/icons/location.svg";

import dockedIcon from "/assets/icons/docked.svg";
import inOrbitIcon from "/assets/icons/in_orbit.svg";
import inTransitIcon from "/assets/icons/in_transit.svg";

import cruiseIcon from "/assets/icons/cruise.svg";
import cruiseIconMuted from "/assets/icons/cruise_muted.svg";
import driftIcon from "/assets/icons/drift.svg";
import driftIconMuted from "/assets/icons/drift_muted.svg";
import burnIcon from "/assets/icons/burn.svg";
import burnIconMuted from "/assets/icons/burn_muted.svg";
import stealthIcon from "/assets/icons/stealth.svg";
import stealthIconMuted from "/assets/icons/stealth_muted.svg";
import { useParams } from "react-router-dom";

const Nav = ({ ship, changeFlightMode, changeNavStatus }: { ship: Ship, changeFlightMode: (ship: Ship, flightMode: string) => void, changeNavStatus: (ship: Ship, action: string) => void }) => {
    const { shipSymbol } = useParams();
    const [timeUntilArrival, setTimeUntilArrival] = useState<number>(0);
    const [flightProgress, setFlightProgress] = useState<number>(0);

    const renderTransitInfos = () => {
        let departureDate = new Date(ship.nav.route.departureTime);
        let arrivalDate = new Date(ship.nav.route.arrival);

        if (ship.nav.status === "IN_TRANSIT") {
            const interval = setInterval(() => {
                const currentTime = Date.now();
                const timeUntilArrival = Math.floor((arrivalDate.getTime() - currentTime) / 1000);
                const flightProgress = Math.floor(100 * (currentTime - departureDate.getTime()) / (arrivalDate.getTime() - departureDate.getTime()));

                setTimeUntilArrival(timeUntilArrival);
                setFlightProgress(flightProgress);

                if (timeUntilArrival <= 0) {
                    clearInterval(interval);
                }
            }, 1000);

            if (timeUntilArrival >= 0) {
                return (

                    <div className='nav__travelStatus'>
                        <div className="nav__transitInfos">
                            <span className='nav__timer'>{timeUntilArrival}s</span>
                            <span className='nav__arrivalTime'>{arrivalDate.toLocaleString("fr-FR").replace("/2023", "")}</span>
                        </div>
                        <ProgressBar max={100} value={flightProgress} color="var(--confirm)" ></ProgressBar>
                    </div>
                )
            }
        }
    }


    const renderStatusIcon = () => {
        switch (ship.nav.status) {
            case "DOCKED":
                return <img className='fleetItem__status' src={dockedIcon} alt="DOCKED" />
            case "IN_ORBIT":
                return <img className='fleetItem__status' src={inOrbitIcon} alt="IN_ORBIT" />
            case "IN_TRANSIT":
                return <img className='fleetItem__status' src={inTransitIcon} alt="IN_TRANSIT" />
        }
    }

    return (
        <div className="nav">
            <div className="nav__content">
                <div className="nav__header">
                    <div className="nav__titleWrapper">
                        <img className="nav__icon" src={navIcon} alt="" />
                        <h3 className="nav__title">Ship Navigation</h3>
                    </div>
                    {renderStatusIcon()}
                </div>
                <div className="nav__location">
                    <div className="nav__systemWrapper">
                        <img className="nav__systemIcon" src={systemIcon} alt="" />
                        <span className="nav__system">{ship.nav.systemSymbol}</span>
                    </div>
                    <div className="nav__waypointWrapper">
                        <img className="nav__waypointIcon" src={waypointIcon} alt="" />
                        <span className="nav__waypoint">{ship.nav.waypointSymbol}</span>
                    </div>
                </div>
                {renderTransitInfos()}
                <div className="nav_status">
                    <button onClick={() => { if (shipSymbol) { changeNavStatus(ship, "DOCK") } }} className={ship.nav.status == "DOCKED" ? "nav__changeStatus nav__changeStatus--dock nav__changeStatus--active" : "nav__changeStatus nav__changeStatus--dock"} disabled={ship.nav.status == "DOCKED"}>{ship.nav.status == "DOCKED" ? "Docked" : "Dock"}</button>
                    <button onClick={() => { if (shipSymbol) { changeNavStatus(ship, "ORBIT") } }} className={ship.nav.status == "IN_ORBIT" ? "nav__changeStatus nav__changeStatus--orbit nav__changeStatus--active" : "nav__changeStatus nav__changeStatus--orbit"} disabled={ship.nav.status == "IN_ORBIT"}>{ship.nav.status == "IN_ORBIT" ? "In orbit" : "Orbit"}</button>
                </div>
                <div className="nav__patch">
                    <button onClick={() => { changeFlightMode(ship, "CRUISE") }} className={ship.nav.flightMode == "CRUISE" ? "nav__cruise nav__cruise--active" : "nav__cruise"} disabled={ship.nav.flightMode == "CRUISE"}>
                        <img className="nav__cruiseIcon" src={ship.nav.flightMode == "CRUISE" ? cruiseIcon : cruiseIconMuted} />
                    </button>
                    <button onClick={() => { changeFlightMode(ship, "DRIFT") }} className={ship.nav.flightMode == "DRIFT" ? "nav__drift nav__drift--active" : "nav__drift"} disabled={ship.nav.flightMode == "DRIFT"}>
                        <img className="nav__driftIcon" src={ship.nav.flightMode == "DRIFT" ? driftIcon : driftIconMuted} />
                    </button>
                    <button onClick={() => { changeFlightMode(ship, "BURN") }} className={ship.nav.flightMode == "BURN" ? "nav__burn nav__burn--active" : "nav__burn"} disabled={ship.nav.flightMode == "BURN"}>
                        <img className="nav__burnIcon" src={ship.nav.flightMode == "BURN" ? burnIcon : burnIconMuted} />
                    </button>
                    <button onClick={() => { changeFlightMode(ship, "STEALTH") }} className={ship.nav.flightMode == "STEALTH" ? "nav__stealth nav__stealth--active" : "nav__stealth"} disabled={ship.nav.flightMode == "STEALTH"}>
                        <img className="nav__stealthIcon" src={ship.nav.flightMode == "STEALTH" ? stealthIcon : stealthIconMuted} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Nav;