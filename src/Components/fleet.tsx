import { FleetData, ShipData } from "../Models/ShipInterface";
import FleetItem from "./fleet_item";

interface FleetComponentProps {
    fleet: FleetData | null;
}

const Fleet: React.FC<FleetComponentProps> = ({ fleet }) => {
    return (
        <>
            {fleet ? (
                fleet.data.map((ship: ShipData) => (
                    <FleetItem key={ship.symbol} ship={ship} />
                ))
            ) : (
                <p>Loading user data...</p>
            )}
        </>
    );
}

export default Fleet;