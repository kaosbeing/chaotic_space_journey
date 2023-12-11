import { Fuel as FuelData } from "../../Models/ShipInterface";
import fuelIcon from "../../assets/icons/fuel.svg";
import "./fuel.css";

const Fuel = ({ fuel }: { fuel: FuelData | null }) => {
    return (
        <div className="fuel">
            <div className="fuel__header" >
                <img className="fuel__icon" src={fuelIcon} />
                <h3 className="fuel__title">Fuel</h3>
            </div>
            {fuel ? (
                <div className="fuel__data">
                    <div className="fuel__content">
                        <span className="fuel__current">{fuel.current}</span> / <span className="fuel__max">{fuel.capacity}</span>
                    </div>
                    <progress className="fuel__progressBar" max={fuel.capacity} value={fuel.current}></progress>
                </div>
            ) : (
                <p>Loading data</p>
            )}
        </div >
    );
}

export default Fuel;