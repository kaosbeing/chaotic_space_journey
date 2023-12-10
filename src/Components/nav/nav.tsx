import "./nav.css";
import "../../assets/icons/nav.svg";
import { useContext, useEffect, useState } from "react";
import { DashboardContext, DashboardData } from "../../Context/dashboard/DashboardContext";

const Nav = () => {
    const dashboardContext = useContext(DashboardContext);
    const [timeUntilArrival, setTimeUntilArrival] = useState<number>(0);
    const [flightProgress, setFlightProgress] = useState<number>(0);
    const [context, setContext] = useState<DashboardData | null>(null);

    const renderTransitInfos = () => {
        if (dashboardContext.ship) {
            let departureDate = new Date(dashboardContext.ship.nav.route.departureTime);
            let arrivalDate = new Date(dashboardContext.ship.nav.route.arrival);

            const calculateTimeAndProgress = () => {
                const currentTime = Date.now();
                const timeUntilArrival = Math.floor((arrivalDate.getTime() - currentTime) / 1000);
                const flightProgress = Math.floor(100 * (currentTime - departureDate.getTime()) / (arrivalDate.getTime() - departureDate.getTime()));

                setTimeUntilArrival(timeUntilArrival);
                setFlightProgress(flightProgress);

                if (timeUntilArrival <= 0) {
                    clearInterval(timer);
                }
            };

            const timer = setInterval(() => {
                calculateTimeAndProgress();
            }, 1000);

            useEffect(() => {
                calculateTimeAndProgress();
                setContext(dashboardContext);
            }, [dashboardContext]);

            if (dashboardContext.ship.nav.status === "IN_TRANSIT") {
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
    }

    return (
        <div className="nav">
            <div className="nav__header">
                <img className="nav__icon" src="" alt="" />
                <h3 className="nav__title">Nav</h3>
            </div>
            <div className="nav__location">
                <div className="nav__systemWrapper">
                    <img className="nav__systemIcon" src="" alt="" />
                    <span className="nav__system"></span>
                </div>
                <div className="nav__waypointWrapper">
                    <img className="nav__waypointIcon" src="" alt="" />
                    <span className="nav__waypoint"></span>
                </div>
            </div>
            {renderTransitInfos()}
            <div className="nav__patch">
                <button className="nav__cruise">
                    <img className="nav__cruiseIcon" src="" alt="" />
                </button>
                <button className="nav__drift">
                    <img className="nav__driftIcon" src="" alt="" />
                </button>
                <button className="nav__burn">
                    <img className="nav__burnIcon" src="" alt="" />
                </button>
                <button className="nav__stealth">
                    <img className="nav__stealthIcon" src="" alt="" />
                </button>
            </div>
        </div>
    );
}

export default Nav;