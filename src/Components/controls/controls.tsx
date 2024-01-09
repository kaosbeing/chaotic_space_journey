import { useState } from "react";
import "./controls.css";
import WaypointList from "../waypointList/waypointList";
import Marketplace from "../marketplace/marketplace";
import { Ship } from "../../Models/ShipInterface";
import { Waypoint } from "../../Models/WaypointInterface";
import { Market } from "../../Models/MarketInterface";
import { Agent } from "../../Models/AgentInterface";
import Shipyard from "../shipyard/shipyard";
import { Shipyard as ShipyardData } from "../../Models/ShipyardInterface";

const Controls = ({ ship, agent, waypoint, market, shipyard, navigate }: { ship: Ship, agent: Agent, waypoint: Waypoint, market: Market | null, shipyard: ShipyardData | null, navigate: (ship: Ship, waypointSymbol: string) => void }) => {
    const [state, setState] = useState<"navigation" | "marketplace" | "shipyard">("navigation");

    const renderOutlet = () => {
        switch (state) {
            case "navigation":
                return <WaypointList currentWaypoint={waypoint} ship={ship} navigate={navigate} ></WaypointList>
            case "marketplace":
                return market ? <Marketplace agent={agent} ship={ship} market={market}></Marketplace> : <></>
            case "shipyard":
                return shipyard ? <Shipyard shipyard={shipyard} agent={agent}></Shipyard> : <></>;
        }
    }

    return (
        <div className='controls'>
            <div className='controls__options'>
                <button className={"controls__button " + (state === "navigation" ? "controls__button--active" : "")}
                    onClick={() => setState("navigation")}>Navigation</button>
                <button className={"controls__button " + (market ? state === "marketplace" ? "controls__button--active" : "" : "controls__button--disabled")}
                    onClick={() => setState("marketplace")} disabled={market ? false : true}>Market</button>
                <button className={"controls__button " + (shipyard ? state === "shipyard" ? "controls__button--active" : "" : "controls__button--disabled")}
                    onClick={() => setState("shipyard")} disabled={shipyard ? false : true}>Shipyard</button>
            </div>
            <div className='controls__body'>
                {renderOutlet()}
            </div>
        </div>
    )
}

export default Controls;