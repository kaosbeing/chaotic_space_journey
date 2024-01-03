import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiHandler from "../../ApiHandler";
import NavComponent from "../nav/nav";
import LocationComponent from "../location/location";
import ShipOverview from "../shipOverview/shipOverview";
import CargoComponent from "../cargo/cargo";

import "./dashboard.css";
import "../../css/loader.css"
import { Waypoint as WaypointData } from "../../Models/WaypointInterface";
import { Market } from "../../Models/MarketInterface";
import refreshIcon from "/assets/icons/refresh.svg";
import Marketplace from "../marketplace/marketplace";
import { AuthContext } from "../../Context/auth/AuthContext";
import { SpacetradersContext } from "../../Context/spacetraders/SpacetradersContext";

const Dashboard = () => {
    const authContext = useContext(AuthContext);
    const STContext = useContext(SpacetradersContext);
    const { shipSymbol } = useParams();
    const ship = STContext.fleet.find((ship) => ship.symbol === shipSymbol);

    const [waypoint, setWaypoint] = useState<WaypointData | null>(null)
    const [market, setMarket] = useState<Market | null>(null);

    const fetchShip = async () => {
        if (shipSymbol) {
            STContext.updateShip(await ApiHandler.getShip(shipSymbol, authContext.token))
        }
    }

    // Once ship is fetched, fetch waypoint
    useEffect(() => {
        if (ship) {
            const fetchWaypoint = async () => {
                setWaypoint(await ApiHandler.getWaypoint(ship.nav.systemSymbol, ship.nav.waypointSymbol, authContext.token));
            }

            fetchWaypoint();
        }
    }, [ship])

    // If ship is at waypoint with marketplace, fetch market
    useEffect(() => {
        if (waypoint && ship && waypoint.traits.some((trait) => trait.symbol == "MARKETPLACE")) {
            const fetchMarket = async () => {
                setMarket(await ApiHandler.getMarket(ship.nav.systemSymbol, ship.nav.waypointSymbol, authContext.token));
            }

            fetchMarket();
        }
    }, [waypoint])

    return (
        <div className="dashboard">
            <header className="dashboard__header">
                <h2 className="dashboard__title">Dashboard</h2>
                <button onClick={fetchShip} className="dashboard__refresh"><img src={refreshIcon} alt="" /></button>
            </header>
            {
                ship && waypoint ? (
                    <div className="dashboard__content">
                        <Marketplace market={market}></Marketplace>
                        <ShipOverview symbol={ship.symbol} cargo={ship.cargo} cooldown={ship.cooldown} fuel={ship.fuel} frame={ship.frame}></ShipOverview>
                        <NavComponent ship={ship} changeFlightMode={STContext.changeFlightMode} changeNavStatus={STContext.changeNavStatus}></NavComponent>
                        <LocationComponent waypoint={waypoint} market={market} ship={ship} extract={STContext.extractRessources} refuel={STContext.refuelShip}></LocationComponent>
                        <CargoComponent cargo={ship.cargo}></CargoComponent>
                    </div >
                ) : (
                    <div className="dashboard__content loading">
                        <div className="loader loader--big"></div>
                    </div >
                )
            }
        </div>
    )
}

export default Dashboard;