import '../assets/css/fleet_item.css';
import { useEffect, useState } from 'react';
import { ShipData } from '../Interfaces/SpaceShipInterface';
import dockedIcon from "../assets/icons/docked.svg";
import in_orbitIcon from "../assets/icons/in_orbit.svg";
import in_transitIcon from "../assets/icons/in_transit.svg";
import locationIcon from "../assets/icons/location.svg";

function FleetItem({ ship }: { ship: ShipData }) {
    const [timeUntilArrival, setTimeUntilArrival] = useState<number | undefined>(0);
    const [flightProgress, setFlightProgress] = useState<number | undefined>(0);

    const renderTransitInfos = () => {
        let departureDate = new Date(ship.nav.route.departureTime);
        let arrivalDate = new Date(ship.nav.route.arrival);

        let timeUntilArrival = Math.floor((arrivalDate.getTime() - Date.now()) / 1000);
        let flightProgress = Math.floor(100 * (Date.now() - departureDate.getTime()) / (arrivalDate.getTime() - departureDate.getTime()));

        const timer = setInterval(() => {
            (timeUntilArrival - 1) >= 0 ? setTimeUntilArrival(timeUntilArrival - 1) : clearInterval(timer);
            setFlightProgress(Math.floor(100 * (Date.now() - departureDate.getTime()) / (arrivalDate.getTime() - departureDate.getTime())));

        }, 1000);

        if (ship.nav.status === "IN_TRANSIT") {
            return (
                <div className='fleetItem__travelStatus'>
                    <span className='fleetItem__timer'>{timeUntilArrival}s</span>
                    <progress max={100} value={flightProgress} className='fleetItem__progressBar'></progress>
                    <div className='fleetItem__transitTiming'>
                        <span className='fleetItem__departureTime'>{departureDate.toLocaleString("fr-FR").replace("/2023", "")}</span>
                        <span className='fleetItem__arrivalTime'>{arrivalDate.toLocaleString("fr-FR").replace("/2023", "")}</span>
                    </div>
                </div>
            )
        }
    }

    const renderStatusIcon = () => {
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
        <div className='fleetItem'>
            <div className='fleetItem__header'>
                <span className='fleetItem__symbol'>{ship.symbol}</span>
                {renderStatusIcon()}
            </div>
            <div className='fleetItem__location'>
                <img className='fleetItem__locationIcon' src={locationIcon} alt="" />
                <span className='fleetItem__waypointSymbol'>{ship.nav.waypointSymbol}</span>
            </div>
            {renderTransitInfos()}
            <div className='fleetItem__frameInfo'>
                <span className='fleetItem__frameName'>{ship.frame.name}</span>
                <p className='fleetItem__frameDesc'>{ship.frame.description}</p>
            </div>
        </div>
    )
}

export default FleetItem;