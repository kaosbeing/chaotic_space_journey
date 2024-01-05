import { useState } from "react";
import "./controls.css";
import WaypointList from "../waypointList/waypointList";
import Marketplace from "../marketplace/marketplace";
import { Ship } from "../../Models/ShipInterface";
import { Waypoint } from "../../Models/WaypointInterface";
import { Market } from "../../Models/MarketInterface";

const Controls = ({ ship, waypoint, market, navigate }: { ship: Ship, waypoint: Waypoint, market: Market | null, navigate: (ship: Ship, waypointSymbol: string) => void }) => {
    const [state, setState] = useState<"navigation" | "marketplace" | "shipyard">("navigation");

    const renderOutlet = () => {
        switch (state) {
            case "navigation":
                return <WaypointList currentWaypoint={waypoint} ship={ship} navigate={navigate} ></WaypointList>
            case "marketplace":
                return market ? <Marketplace market={market}></Marketplace> : <></>
            case "shipyard":
                return <></>
        }
    }

    return (
        <div className='controls'>
            <div className='controls__options'>
                <button className="controls__button" onClick={() => setState("navigation")}>Navigation</button>
                <button className="controls__button" onClick={() => setState("marketplace")} disabled={market ? false : true}>Market</button>
                <button className="controls__button" onClick={() => setState("shipyard")}>Shipyard</button>
            </div>
            <div className='controls__body'>
                {renderOutlet()}
            </div>
        </div>
    )
}

export default Controls;