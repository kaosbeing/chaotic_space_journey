import { useEffect, useState } from "react";
import "./waypointList.css";
import { Waypoint } from "../../Models/WaypointInterface";

const WaypointList = (systemSymbol: string) => {
    const [waypoints, setWaypoints] = useState<Waypoint | null>(null);

    const fetchWholeSystem = async () => {

    }

    useEffect(() => {
        const localSystem = localStorage.getItem(systemSymbol);

        localSystem ? setWaypoints(JSON.parse(localSystem)) : fetchWholeSystem();
    }, [])

}

export default WaypointList;