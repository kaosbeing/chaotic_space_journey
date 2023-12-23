import { useEffect, useState } from "react";
import "./waypointList.css";
import { Waypoint } from "../../Models/WaypointInterface";
import SpaceTraders from "../../SpaceTraders";

const WaypointList = ({ systemSymbol }: { systemSymbol: string }) => {
    const [waypoints, setWaypoints] = useState<Waypoint | null>(null);

    const fetchWholeSystem = async () => {
        const response = await SpaceTraders.listWaypoints(systemSymbol, { limit: 20 });
        let pages = Math.ceil(response.meta.total / response.meta.limit);

        let fetchedWaypoints = response.data;

        for (let i = 0; i < pages; i++) {
            let waypoints = await SpaceTraders.listWaypoints(systemSymbol, { limit: 20, page: i });
            fetchedWaypoints = fetchedWaypoints.concat(waypoints.data)
        }

        localStorage.setItem(systemSymbol, JSON.stringify(fetchedWaypoints));
        return fetchedWaypoints;
    }

    useEffect(() => {
        const localSystem = localStorage.getItem(systemSymbol);

        localSystem ? setWaypoints(JSON.parse(localSystem)) : fetchWholeSystem();
    }, [])

    return (
        <>
            uwu mon reuf srx
        </>
    )

}

export default WaypointList;