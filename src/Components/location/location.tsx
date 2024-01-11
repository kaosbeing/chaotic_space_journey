import { Waypoint, Trait as TraitData } from "../../Models/WaypointInterface";
import infoIcon from "/assets/icons/info.svg";
import typeIcon from "/assets/icons/waypoint_type.svg";
import locationIcon from "/assets/icons/location.svg";
import "./location.css";
import { Market } from "../../Models/MarketInterface";
import { Ship } from "../../Models/ShipInterface";

const Location = ({ ship, waypoint, market, extract, refuel }: { ship: Ship, waypoint: Waypoint, market: Market | null, extract: (ship: Ship) => void, refuel: (ship: Ship) => void }) => {
    const canExcavate = (waypoint?.type == "ASTEROID" || waypoint?.type == "ENGINEERED_ASTEROID" || waypoint?.type == "ASTEROID_FIELD") && ship.nav.status == "IN_ORBIT";
    const canRefuel = market?.tradeGoods?.some((tradeGood) => tradeGood.symbol == "FUEL") && ship.nav.status == "DOCKED";

    return (
        <div className="waypointInfo">
            <div className="waypointInfo__header">
                <img className="waypointInfo__icon" src={infoIcon} alt="" />
                <h3 className="waypointInfo__title">Current location</h3>
            </div>
            <div className="waypointInfo__infos">
                <div className="waypointInfo__waypointTypeWrapper">
                    <img className="waypointInfo__waypointTypeIcon" src={typeIcon} alt="" />
                    <span className="waypointInfo__waypointType">{waypoint?.type}</span>
                </div>
                <div className="waypointInfo__waypointCoordsWrapper">
                    <img className="waypointInfo__waypointCoordsIcon" src={locationIcon} alt="" />
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
                <button onClick={() => { refuel(ship) }} className={canRefuel ? "waypointInfo__refuel" : "waypointInfo__refuel waypointInfo__refuel--disabled"} disabled={!canRefuel}>Refuel</button>
                <button onClick={() => { extract(ship) }} className={canExcavate ? "waypointInfo__excavate" : "waypointInfo__excavate waypointInfo__excavate--disabled"} disabled={!canExcavate}>Excavate</button>
            </div>
        </div>
    )
}

export default Location;