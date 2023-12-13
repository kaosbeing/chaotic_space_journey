import { FleetData, ShipData } from "../../Models/ShipInterface";
import Ship from "../ship/ship";
import "./fleet.css";

const Fleet = ({ fleet }: { fleet: FleetData }) => {
    return (
        <>
            <div className="fleet">
                <h2 className="fleet__title">My Fleet</h2>
                {fleet ? (
                    fleet.data.map((ship: ShipData) => (
                        <Ship key={ship.symbol} ship={ship} />
                    ))
                ) : (
                    <p>Loading fleet data...</p>
                )}
            </div>
        </>
    );
}

export default Fleet;