import { Link } from "react-router-dom";
import { Ship as ShipData } from "../../Models/ShipInterface";
import Ship from "../ship/ship";
import "./fleet.css";
import chevron from "/assets/icons/chevron_right.svg";

const Fleet = ({ fleet }: { fleet: ShipData[] | null }) => {
    return (
        <>
            <Link to={"/fleet"} className="full_fleet">
                <span>Full fleet</span>
                <img src={chevron} />
            </Link>
            {fleet ? (
                <div className="fleet">
                    {fleet.map((ship: ShipData) => (
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