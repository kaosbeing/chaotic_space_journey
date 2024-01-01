import { Ship } from "../../Models/ShipInterface";
import "./fleet.css";

const Fleet = ({ fleet }: { fleet: Ship[] | null }) => {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Fuel</th>
                        <th>Cargo</th>
                    </tr>
                </thead>
                <tbody>
                    {fleet ? (
                        fleet.map(() => (
                            <div></div>
                        ))
                    ) : (
                        <div className="loader big"></div>
                    )}
                </tbody>
            </table>
        </>
    );
}

export default Fleet;