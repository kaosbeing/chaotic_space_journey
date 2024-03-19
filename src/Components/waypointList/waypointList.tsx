import { useContext, useEffect, useState } from "react";
import "./waypointList.css";
import { Waypoint } from "../../Models/WaypointInterface";
import waypointsIcon from "/assets/icons/nav.svg";
import { Ship } from "../../Models/ShipInterface";
import { SpacetradersContext } from "../../Context/spacetraders/SpacetradersContext";

const WaypointList = ({ currentWaypoint, ship, navigate, display, close }: { currentWaypoint: Waypoint, ship: Ship, navigate: (ship: Ship, waypointSymbol: string) => void, display: boolean, close: () => void }) => {
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
                <button onClick={() => { navigate(ship, waypoint.symbol); close(); }} className="listitem__go">Go</button>
            )
        }
    }

    const renderWaypointList = (waypoints: Waypoint[]) => {
        waypoints.sort((a, b) => {
            return (Math.round(Math.sqrt(Math.pow(currentWaypoint.x - a.x, 2) + Math.pow(currentWaypoint.y - a.y, 2)))) - (Math.round(Math.sqrt(Math.pow(currentWaypoint.x - b.x, 2) + Math.pow(currentWaypoint.y - b.y, 2))));
        })

        return (
            waypoints.map((waypoint: Waypoint) => (
                <tr key={waypoint.symbol} className="listItem">
                    <td className=" listItem__cell">
                        <div className="listitem__header">
                            <img className="listitem__icon" src={(import.meta.env.BASE_URL + "/assets/icons/waypoint_type/" + waypoint.type + ".svg")} alt={waypoint.type} />
                            <span className="listitem__symbol">{waypoint.symbol}</span>
                        </div>
                    </td>
                    <td className="listitem__distance listItem__cell"><span>{Math.round(Math.sqrt(Math.pow(currentWaypoint.x - waypoint.x, 2) + Math.pow(currentWaypoint.y - waypoint.y, 2)))}</span></td>
                    <td className="listitem__traits listItem__cell">
                        {(waypoint.traits.some((trait) => trait.symbol == "MARKETPLACE")) && (<span className="listItem__trait">MARKETPLACE</span>)}
                        {(waypoint.traits.some((trait) => trait.symbol == "SHIPYARD")) && (<span className="listItem__trait">SHIPYARD</span>)}
                    </td>
                    <td className="listitem__buttonWrapper listItem__cell">
                        {renderNavButton(waypoint)}
                    </td>
                </tr>
            ))
        )
    }

    return (
        <>
            {display && (
                <div onKeyDown={(e) => { (e.key === "Escape" && close()) }} onClick={() => { close() }} className="waypointList__wrapper">
                    <div className="waypointlist__scrollable">
                        <div onClick={(e) => { e.stopPropagation() }} className="waypointList">
                            <div className="waypointList__header">
                                <img className="waypointList__icon" src={waypointsIcon} alt="" />
                                <h3 className="waypointList__title">Waypoints</h3>
                            </div>
                            <table>
                                <thead>
                                    <tr className="waypointlist__listheader">
                                        <th className="listItem__cell">Symbol</th>
                                        <th className="listItem__cell">Distance</th>
                                        <th className="listItem__cell">Traits</th>
                                        <th className="listItem__cell">Nav</th>
                                    </tr>
                                </thead>
                                {waypoints ? (
                                    <tbody className="waypointList__list">
                                        {renderWaypointList(waypoints)}
                                    </tbody>
                                ) : (
                                    <div className="waypointList__list">
                                        <div className=" loading">
                                            <div className="loader"></div>
                                        </div>
                                    </div>
                                )}
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default WaypointList;