import { FleetData, ShipData } from "../../Models/ShipInterface";
import Ship from "../ship/ship";
import "./fleet.css";

const Fleet = ({ fleet }: { fleet: FleetData | null }) => {
    return (
        <>
            <h2 className="fleet__title">My Fleet</h2>
            {fleet ? (
                <div className="fleet">
                    {fleet.data.map((ship: ShipData) => (
                        <Ship key={ship.symbol} ship={ship} />
                    ))}
                </div>
            ) : (
                <div className="fleet loading">
                    <div className="loader"></div>
                </div>
            )}
        </>
    );
}

export default Fleet;