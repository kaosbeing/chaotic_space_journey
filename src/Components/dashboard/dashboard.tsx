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
import Controls from "../controls/controls";
import { Shipyard } from "../../Models/Shipyard";

const Dashboard = () => {
    const authContext = useContext(AuthContext);
    const STContext = useContext(SpacetradersContext);
    const { shipSymbol } = useParams();
    const ship = STContext.fleet.find((ship) => ship.symbol === shipSymbol);

    const [waypoint, setWaypoint] = useState<WaypointData | null>(null)
    const [market, setMarket] = useState<Market | null>(null);
    const [shipyard, setShipyard] = useState<Shipyard | null>(null);

    useEffect(() => {
        const fetchWaypoint = async () => {
            if (ship) {
                let waypoint = await STContext.getWaypoint(ship.nav.systemSymbol, ship.nav.waypointSymbol);
                setWaypoint(waypoint ? waypoint : null);
            }
        };

        fetchWaypoint();
    }, [ship])

    const updateDashboard = async () => {
        if (shipSymbol) {
            STContext.updateShip(await ApiHandler.getShip(shipSymbol, authContext.token))
        }
    }

    useEffect(() => {
        const fetchMarketAndShipyard = async () => {
            if (!waypoint?.traits.some((trait) => trait.symbol === "SHIPYARD" || trait.symbol === "SHIPYARD")) {
                setMarket(null);
                setShipyard(null);
            }

            if (waypoint?.traits.some((trait) => trait.symbol === "MARKETPLACE")) {
                setMarket(await ApiHandler.getMarket(waypoint.systemSymbol, waypoint.symbol, authContext.token));
            }

            if (waypoint?.traits.some((trait) => trait.symbol === "SHIPYARD")) {
                setShipyard(await ApiHandler.getShipyard(waypoint.systemSymbol, waypoint.symbol, authContext.token));
            }
        }

        fetchMarketAndShipyard();
    }, [waypoint])

    return (
        <div className="dashboard">
            <header className="dashboard__header">
                <h2 className="dashboard__title">Dashboard</h2>
                <button onClick={updateDashboard} className="dashboard__refresh"><img src={refreshIcon} alt="" /></button>
            </header>
            {
                STContext.agent && ship && waypoint ? (
                    <div className="dashboard__content">
                        <Controls ship={ship} agent={STContext.agent} waypoint={waypoint} market={market} shipyard={shipyard} navigate={STContext.navigate}></Controls>
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