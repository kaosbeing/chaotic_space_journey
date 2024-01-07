import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Ship } from '../../Models/ShipInterface';
import ProgressBar from '../progressBar/progressBar';
import { SpacetradersContext } from '../../Context/spacetraders/SpacetradersContext';

import dockedIcon from "/assets/icons/docked.svg";
import in_orbitIcon from "/assets/icons/in_orbit.svg";
import in_transitIcon from "/assets/icons/in_transit.svg";
import locationIcon from "/assets/icons/location.svg";

const sidebarShip = ({ ship }: { ship: Ship }) => {
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

        if (timeUntilArrival == 0) {
            clearInterval(timer);
            const editedShipData = { ...ship, nav: { ...ship.nav, status: "IN_ORBIT" } };
            STContext.updateShip(editedShipData);
        }
    };

    const renderTransitInfos = (ship: Ship) => {
        if (ship.nav.status === "IN_TRANSIT") {
            let arrivalDate = new Date(ship.nav.route.arrival);

            timer = setInterval(() => {
                calculateTimeAndProgress(ship);
            }, 1000);

            return (
                <div className='fleetItem__travelStatus'>
                    <div className='fleetItem__transitTiming'>
                        <span className='fleetItem__timer'>{timeUntilArrival}s</span>
                        <span className='fleetItem__arrivalTime'>{arrivalDate.toLocaleString("fr-FR").replace("/2024", "")}</span>
                    </div>
                    <ProgressBar max={100} value={flightProgress} color='var(--confirm)'></ProgressBar>
                </div>
            )
        }
    }

    const renderStatusIcon = (ship: Ship) => {
        console.log(ship.nav.status);

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
    )
}

export default sidebarShip