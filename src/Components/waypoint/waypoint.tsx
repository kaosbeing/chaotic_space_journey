import { Waypoint as WaypointData, Trait as TraitData } from "../../Models/WaypointInterface";
import infoIcon from "../../assets/icons/info.svg";
import typeIcon from "../../assets/icons/waypoint_type.svg";
import locationIcon from "../../assets/icons/location.svg";
import "./waypoint.css";
import { useParams } from "react-router-dom";
import { Market } from "../../Models/MarketInterface";
import { Nav } from "../../Models/ShipInterface";

const WaypointInfo = ({ nav, waypoint, market, extract, refuel }: { nav: Nav | null, waypoint: WaypointData | null, market: Market | null, extract: (shipSymbol: string) => void, refuel: (shipSymbol: string) => void }) => {
    const { shipSymbol } = useParams();
    const canExcavate = (waypoint?.type == "ASTEROID" || waypoint?.type == "ENGINEERED_ASTEROID" || waypoint?.type == "ASTEROID_FIELD") && nav?.status == "IN_ORBIT";
    const canRefuel = market?.tradeGoods?.some((tradeGood) => tradeGood.symbol == "FUEL") && nav?.status == "DOCKED";

    return (
        <div className="waypointInfo">
            <div className="waypointInfo__header">
                <img className="waypointInfo__icon" src={infoIcon} />
                <h3 className="waypointInfo__title">Waypoint Info</h3>
            </div>
            <div className="waypointInfo__infos">
                <div className="waypointInfo__waypointTypeWrapper">
                    <img className="waypointInfo__waypointTypeIcon" src={typeIcon} />
                    <span className="waypointInfo__waypointType">{waypoint?.type}</span>
                </div>
                <div className="waypointInfo__waypointCoordsWrapper">
                    <img className="waypointInfo__waypointCoordsIcon" src={locationIcon} />
                    <span className="waypointInfo__waypointCoords">{waypoint?.x}, {waypoint?.y}</span>
                </div>
            </div>
            <div className="waypointInfo__traits">
                {
                    (waypoint?.traits.map((trait: TraitData) => (
                        <span key={trait.name} className="waypointInfo__trait">{trait.name}</span>
                    )))
                }
            </div>
            <div className="waypointInfo__actions">
                <button onClick={() => { if (shipSymbol) { refuel(shipSymbol) } }} className={canRefuel ? "waypointInfo__refuel" : "waypointInfo__refuel waypointInfo__refuel--disabled"} disabled={!canRefuel}>Refuel</button>
                <button onClick={() => { if (shipSymbol) { extract(shipSymbol) } }} className={canExcavate ? "waypointInfo__excavate" : "waypointInfo__excavate waypointInfo__excavate--disabled"} disabled={!canExcavate}>Excavate</button>
            </div>
        </div>
    )
}

export default WaypointInfo;