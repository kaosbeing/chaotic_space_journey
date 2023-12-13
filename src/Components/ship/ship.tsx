import './ship.css';
import { useEffect, useState } from 'react';
import { ShipData } from '../../Models/ShipInterface';
import { Link } from 'react-router-dom';

// Icons
import dockedIcon from "../../assets/icons/docked.svg";
import in_orbitIcon from "../../assets/icons/in_orbit.svg";
import in_transitIcon from "../../assets/icons/in_transit.svg";
import locationIcon from "../../assets/icons/location.svg";

function Ship({ ship }: { ship: ShipData }) {
    const [shipData, setShipData] = useState<ShipData>(ship);
    const [timeUntilArrival, setTimeUntilArrival] = useState<number>(0);
    const [flightProgress, setFlightProgress] = useState<number>(0);

    const renderTransitInfos = () => {
        let departureDate = new Date(ship.nav.route.departureTime);
        let arrivalDate = new Date(ship.nav.route.arrival);

        const calculateTimeAndProgress = () => {
            const currentTime = Date.now();
            const timeUntilArrival = Math.floor((arrivalDate.getTime() - currentTime) / 1000);
            const flightProgress = Math.floor(100 * (currentTime - departureDate.getTime()) / (arrivalDate.getTime() - departureDate.getTime()));

            setTimeUntilArrival(timeUntilArrival);
            setFlightProgress(flightProgress);

            if (timeUntilArrival <= 0) {
                clearInterval(timer);
                let editedShipData = shipData;
                editedShipData.nav.status = "IN_ORBIT";
                setShipData(editedShipData);
            }
        };

        const timer = setInterval(() => {
            calculateTimeAndProgress();
        }, 1000);

        useEffect(() => {
            calculateTimeAndProgress();
        }, []);

        if (shipData.nav.status === "IN_TRANSIT") {
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
        switch (shipData.nav.status) {
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
        <Link to={shipData.symbol} className='fleetItem'>
            <div className='fleetItem__header'>
                <span className='fleetItem__symbol'>{shipData.symbol}</span>
                <span className='fleetItem__frameName'>{shipData.frame.name}</span>
                {renderStatusIcon()}
            </div>
            <div className='fleetItem__location'>
                <img className='fleetItem__locationIcon' src={locationIcon} alt="" />
                <span className='fleetItem__waypointSymbol'>{shipData.nav.waypointSymbol}</span>
            </div>
            {renderTransitInfos()}
        </Link>
    )
}

export default Ship;