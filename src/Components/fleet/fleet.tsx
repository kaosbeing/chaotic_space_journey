import { useContext } from "react";
import "./fleet.css";
import { SpacetradersContext } from "../../Context/spacetraders/SpacetradersContext";
import { Link } from "react-router-dom";

import dockedIcon from "/assets/icons/docked.svg";
import in_orbitIcon from "/assets/icons/in_orbit.svg";
import in_transitIcon from "/assets/icons/in_transit.svg";
import { Ship } from "../../Models/ShipInterface";

const Fleet = () => {
    const STContext = useContext(SpacetradersContext);

    const renderStatusIcon = (ship: Ship) => {
        switch (ship.nav.status) {
            case "DOCKED":
                return <img src={dockedIcon} className="fleet__shipStatus" />;
            case "IN_ORBIT":
                return <img src={in_orbitIcon} className="fleet__shipStatus" />;
            case "IN_TRANSIT":
                return <img src={in_transitIcon} className="fleet__shipStatus" />;
        }
    }

    return (
        <div className="fleet__wrapper">
            <table className="fleet">
                <thead className="fleet__head">
                    <tr>
                        <th className="fleet__cell">Symbol</th>
                        <th className="fleet__cell">Role</th>
                        <th className="fleet__cell">Status</th>
                        <th className="fleet__cell">Fuel</th>
                        <th className="fleet__cell">Cargo</th>
                    </tr>
                </thead>
                <tbody className="fleet__body">
                    {STContext.fleet ? (
                        STContext.fleet.map((ship) => (
                            <tr className="fleet__row">
                                <td className="fleet__cell"><Link to={"/fleet/" + ship.symbol} className="fleet__shipSymbol">{ship.symbol}</Link></td>
                                <td className="fleet__cell"><span className="fleet__shipRole">{ship.registration.role}</span></td>
                                <td className="fleet__cell">{renderStatusIcon(ship)}</td>
                                <td className="fleet__cell"><span className="fleet__shipFuel">{ship.fuel.current} / {ship.fuel.capacity}</span></td>
                                <td className="fleet__cell"><span className="fleet__shipCargo">{ship.cargo.units} / {ship.cargo.capacity}</span></td>
                            </tr>
                        ))
                    ) : (
                        <tr className="loader big"></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Fleet;