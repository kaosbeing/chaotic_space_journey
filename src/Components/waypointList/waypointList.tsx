import { useContext, useEffect, useState } from "react";
import "./waypointList.css";
import { Waypoint } from "../../Models/WaypointInterface";
import waypointsIcon from "/assets/icons/nav.svg";
import { Ship } from "../../Models/ShipInterface";
import { SpacetradersContext } from "../../Context/spacetraders/SpacetradersContext";

const WaypointList = ({ currentWaypoint, ship, navigate }: { currentWaypoint: Waypoint, ship: Ship, navigate: (ship: Ship, waypointSymbol: string) => void }) => {
    const STContext = useContext(SpacetradersContext);
    const [waypoints, setWaypoints] = useState<Waypoint[]>();

    useEffect(() => {
        const fetchWaypointList = async () => {
            const waypointList = await STContext.getWaypointList(ship.nav.systemSymbol) ?? [];
            setWaypoints(waypointList);
        }

        fetchWaypointList();
    }, [])

    const renderNavButton = (waypoint: Waypoint) => {
        const dist = Math.round(Math.sqrt(Math.pow(currentWaypoint.x - waypoint.x, 2) + Math.pow(currentWaypoint.y - waypoint.y, 2)));
        let fuelConsumedByAFlight = 0;

        if (ship.nav.flightMode == "CRUISE" || ship.nav.flightMode == "STEALTH") {
            fuelConsumedByAFlight = dist;
        } else if (ship.nav.flightMode == "BURN") {
            fuelConsumedByAFlight = 2 * dist;
        } else if (ship.nav.flightMode == "DRIFT") {
            fuelConsumedByAFlight = 1;
        }

        if ((ship.fuel.current >= fuelConsumedByAFlight || ship.fuel.capacity == 0) && ship.nav.status == "IN_ORBIT" && waypoint.symbol !== ship.nav.waypointSymbol) {
            return (
                <button onClick={() => { navigate(ship, waypoint.symbol) }} className="listitem__go">Go</button>
            )
        }
    }

    return (
        <div className="waypointList">
            <div className="waypointList__header">
                <img className="waypointList__icon" src={waypointsIcon} alt="" />
                <h3 className="waypointList__title">Waypoints</h3>
            </div>
            <div className="waypointList__options">
                Options (later)
            </div>
            {waypoints ? (
                <div className="waypointList__list">
                    {waypoints.map((waypoint: Waypoint) => (
                        <div key={waypoint.symbol} className="listItem">
                            <div className="listitem__header">
                                <img src={("/assets/icons/waypoint_type/" + waypoint.type + ".svg")} alt={waypoint.type} />
                                <span className="listitem__symbol">{waypoint.symbol}</span>
                            </div>
                            <div className="listitem__distance"><span>{Math.round(Math.sqrt(Math.pow(currentWaypoint.x - waypoint.x, 2) + Math.pow(currentWaypoint.y - waypoint.y, 2)))}</span></div>
                            <div className="listitem__traits">
                                {(waypoint.traits.some((trait) => trait.symbol == "MARKETPLACE")) && (<span className="listItem__trait">MARKETPLACE</span>)}
                                {(waypoint.traits.some((trait) => trait.symbol == "SHIPYARD")) && (<span className="listItem__trait">SHIPYARD</span>)}
                            </div>
                            <div className="listitem__buttonWrapper">
                                {renderNavButton(waypoint)}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="waypointList__list">
                    <div className=" loading">
                        <div className="loader"></div>
                    </div>
                </div>
            )}
        </div>
    )

}

export default WaypointList;