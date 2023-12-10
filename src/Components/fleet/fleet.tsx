import { FleetData, ShipData } from "../../Models/ShipInterface";
import Ship from "../ship/ship";

interface FleetComponentProps {
    fleet: FleetData | null;
}

const Fleet: React.FC<FleetComponentProps> = ({ fleet }) => {
    return (
        <>
            {fleet ? (
                fleet.data.map((ship: ShipData) => (
                    <Ship key={ship.symbol} ship={ship} />
                ))
            ) : (
                <p>Loading fleet data...</p>
            )}
        </>
    );
}

export default Fleet;