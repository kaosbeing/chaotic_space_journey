import "./nav.css";
import "../../assets/icons/nav.svg";
import { useState } from "react";
import { Nav as NavData } from "../../Models/ShipInterface";

import navIcon from "../../assets/icons/nav.svg";
import systemIcon from "../../assets/icons/system.svg";
import waypointIcon from "../../assets/icons/waypoint_type.svg";

import dockedIcon from "../../assets/icons/docked.svg";
import inOrbitIcon from "../../assets/icons/in_orbit.svg";
import inTransitIcon from "../../assets/icons/in_transit.svg";

import cruiseIcon from "../../assets/icons/cruise.svg";
import cruiseIconMuted from "../../assets/icons/cruise_muted.svg";
import driftIcon from "../../assets/icons/drift.svg";
import driftIconMuted from "../../assets/icons/drift_muted.svg";
import burnIcon from "../../assets/icons/burn.svg";
import burnIconMuted from "../../assets/icons/burn_muted.svg";
import stealthIcon from "../../assets/icons/stealth.svg";
import stealthIconMuted from "../../assets/icons/stealth_muted.svg";

const Nav = ({ nav, changeFlightMode }: { nav: NavData | null, changeFlightMode: (flightMode: string) => void }) => {
    const [timeUntilArrival, setTimeUntilArrival] = useState<number>(0);
    const [flightProgress, setFlightProgress] = useState<number>(0);

    const renderTransitInfos = () => {
        if (nav?.route) {
            let departureDate = new Date(nav.route.departureTime);
            let arrivalDate = new Date(nav.route.arrival);

            if (nav.status === "IN_TRANSIT") {
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

                return (
                    <div className='nav__travelStatus'>
                        <div className="nav__transitInfos">
                            <span className='nav__timer'>{timeUntilArrival}s</span>
                            <span className='nav__arrivalTime'>{arrivalDate.toLocaleString("fr-FR").replace("/2023", "")}</span>
                        </div>
                        <progress max={100} value={flightProgress} className='nav__progressBar'></progress>
                    </div>
                )
            }
        }
    }


    const renderStatusIcon = () => {
        switch (nav?.status) {
            case "DOCKED":
                return <img className='fleetItem__status' src={dockedIcon} alt="DOCKED" />
            case "IN_ORBIT":
                return <img className='fleetItem__status' src={inOrbitIcon} alt="IN_ORBIT" />
            case "IN_TRANSIT":
                return <img className='fleetItem__status' src={inTransitIcon} alt="IN_TRANSIT" />
            default:
                return <img className='fleetItem__status' src="" alt="UNKNOWN" />
        }
    }

    return (
        <div className="nav">
            <div className="nav__content">
                <div className="nav__header">
                    <img className="nav__icon" src={navIcon} alt="" />
                    <h3 className="nav__title">Nav</h3>
                </div>
                <div className="nav__location">
                    <div className="nav__systemWrapper">
                        <img className="nav__systemIcon" src={systemIcon} alt="" />
                        <span className="nav__system">{nav?.systemSymbol}</span>
                    </div>
                    <div className="nav__waypointWrapper">
                        <img className="nav__waypointIcon" src={waypointIcon} alt="" />
                        <span className="nav__waypoint">{nav?.waypointSymbol}</span>
                    </div>
                </div>
                {renderTransitInfos()}
                <div className="nav__patch">
                    <button onClick={() => { changeFlightMode("CRUISE") }} className={nav?.flightMode == "CRUISE" ? "nav__cruise nav__cruise--active" : "nav__cruise"}>
                        <img className="nav__cruiseIcon" src={nav?.flightMode == "CRUISE" ? cruiseIcon : cruiseIconMuted} />
                    </button>
                    <button onClick={() => { changeFlightMode("DRIFT") }} className={nav?.flightMode == "DRIFT" ? "nav__drift nav__drift--active" : "nav__drift"}>
                        <img className="nav__driftIcon" src={nav?.flightMode == "DRIFT" ? driftIcon : driftIconMuted} />
                    </button>
                    <button onClick={() => { changeFlightMode("BURN") }} className={nav?.flightMode == "BURN" ? "nav__burn nav__burn--active" : "nav__burn"}>
                        <img className="nav__burnIcon" src={nav?.flightMode == "BURN" ? burnIcon : burnIconMuted} />
                    </button>
                    <button onClick={() => { changeFlightMode("STEALTH") }} className={nav?.flightMode == "STEALTH" ? "nav__stealth nav__stealth--active" : "nav__stealth"}>
                        <img className="nav__stealthIcon" src={nav?.flightMode == "STEALTH" ? stealthIcon : stealthIconMuted} />
                    </button>
                </div>
            </div>
            {renderStatusIcon()}
        </div>
    );
}

export default Nav;