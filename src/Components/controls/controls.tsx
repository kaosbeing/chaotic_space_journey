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
    const [displayWaypointList, setDisplayWaypointList] = useState<boolean>(false);
    const [displayMarketplace, setDisplayMarketplace] = useState<boolean>(false);
    const [displayShipyard, setDisplayShipyard] = useState<boolean>(false);

    const closeWaypointList = () => {
        setDisplayWaypointList(false);
    }
    const closeMarketplace = () => {
        setDisplayMarketplace(false);
    }
    const closeShipyard = () => {
        setDisplayShipyard(false);
    }

    const renderOutlet = () => {
        return (
            <>
                <WaypointList currentWaypoint={waypoint} ship={ship} navigate={navigate} display={displayWaypointList} close={closeWaypointList}></WaypointList>
                {market && <Marketplace agent={agent} ship={ship} market={market} display={displayMarketplace} close={closeMarketplace}></Marketplace>}
                {shipyard && <Shipyard shipyard={shipyard} agent={agent} display={displayShipyard} close={closeShipyard}></Shipyard>}
            </>
        )
    }

    const hasMarket = market !== null;
    const hasShipyard = shipyard !== null;
    // (state === "marketplace")
    // (state === "shipyard")

    return (
        <>
            <div className='controls'>
                <div className="controls__header">
                    <img className="controls__icon" src={""} alt="" />
                    <h3 className="controls__title">Actions</h3>
                </div>
                <div className="controls__body">

                    <button
                        className="controls__button"
                        onClick={() => setDisplayWaypointList(true)}
                    >Navigation</button>

                    <button
                        className={(hasMarket) ? "controls__button" : "controls__button controls__button--disabled"}
                        onClick={() => {
                            setDisplayMarketplace(true);
                        }}
                        disabled={!hasMarket}
                    >Market</button>

                    <button
                        className={(hasShipyard) ? "controls__button" : "controls__button controls__button--disabled"}
                        onClick={() => {
                            setDisplayShipyard(true);
                        }}
                        disabled={!hasShipyard}
                    >Shipyard</button>
                </div>
            </div>
            {renderOutlet()}
        </>
    )
}

export default Controls;