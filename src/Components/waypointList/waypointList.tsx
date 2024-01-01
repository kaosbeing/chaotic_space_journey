import { useEffect, useState } from "react";
import "./waypointList.css";
import { Waypoint } from "../../Models/WaypointInterface";
import ApiHandler from "../../ApiHandler";
import waypointsIcon from "/assets/icons/nav.svg";
import { Fuel, Nav } from "../../Models/ShipInterface";

const WaypointList = ({ systemSymbol, currentWaypoint, fuel, nav, navigate }: { systemSymbol: string, currentWaypoint: Waypoint, fuel: Fuel | null, nav: Nav | null, navigate: (waypointSymbol: string) => void }) => {
    const [waypoints, setWaypoints] = useState<Waypoint[]>([]);

    const fetchWholeSystem = async () => {
        const response = await ApiHandler.listWaypoints(systemSymbol, { limit: 20 });
        let pages = Math.ceil(response.meta.total / response.meta.limit);

        let fetchedWaypoints = response.data;

        for (let i = 2; i <= pages; i++) {
            let waypoints = await ApiHandler.listWaypoints(systemSymbol, { limit: 20, page: i });
            fetchedWaypoints = fetchedWaypoints.concat(waypoints.data)
        }

        localStorage.setItem(systemSymbol, JSON.stringify(fetchedWaypoints));
        setWaypoints(fetchedWaypoints);
    }

    useEffect(() => {
        const localSystem = localStorage.getItem(systemSymbol);

        localSystem ? setWaypoints(JSON.parse(localSystem)) : fetchWholeSystem();
    }, [])

    const renderNavButton = (waypoint: Waypoint) => {
        if (fuel && nav) {

            const dist = Math.round(Math.sqrt(Math.pow(currentWaypoint.x - waypoint.x, 2) + Math.pow(currentWaypoint.y - waypoint.y, 2)));
            let fuelConsumedByAFlight = 0;

            if (nav.flightMode == "CRUISE" || nav.flightMode == "STEALTH") {
                fuelConsumedByAFlight = dist;
            } else if (nav.flightMode == "BURN") {
                fuelConsumedByAFlight = 2 * dist;
            } else if (nav.flightMode == "DRIFT") {
                fuelConsumedByAFlight = 1;
            }

            if ((fuel.current >= fuelConsumedByAFlight || fuel.capacity == 0) && nav.status == "IN_ORBIT") {
                return (
                    <button onClick={() => { navigate(waypoint.symbol) }} className="listitem__go">Go</button>
                )
            }
        }
    }

    return (
        <div className="waypointList">
            <div className="waypointList__header">
                <img className="waypointList__icon" src={waypointsIcon} />
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