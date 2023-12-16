import { ShipData } from "../../Models/ShipInterface";
import "./shipOverview.css";

const ShipOverview = ({ ship }: { ship: ShipData }) => {
    return (
        <div className="shipOverview">
            <div className="shipOverview__header">
                <img className="shipOverview__icon" src="" alt="" />
                <h2 className="shipOverview__title">Current Ship</h2>
            </div>
            <div>

            </div>
            <div className="shipOverview__symbol">{ship.symbol}</div>
            <div className="shipOverview__fuel">
                <div className="shipOverview__fuelHeader">
                    <div className="shipOverview__titleWrapper">
                        <img className="shipOverview__fuelIcon" src=""></img>
                        <h3 className="shipOverview__fuelTitle">Fuel</h3>
                    </div>
                    <div className="shipOverview__fuelLevel">
                        <span className="shipOverview__fuelCurrent">{ship.fuel.current}</span> / <span className="shipOverview__fuelMax">{ship.fuel.capacity}</span>
                    </div>
                </div>
                <progress className="shipOverview__fuelProgressBar" max={ship.fuel.capacity} value={ship.fuel.current}></progress>
            </div>
            <div className="shipOverview__cargo">
                <div className="shipOverview__cargoHeader">
                    <div className="shipOverview__titleWrapper">
                        <img className="shipOverview__cargoIcon" src=""></img>
                        <h3 className="shipOverview__cargoTitle">Cargo</h3>
                    </div>
                    <div className="shipOverview__cargoLevel">
                        <span className="shipOverview__cargoCurrent">{ship.cargo.units}</span> / <span className="shipOverview__cargoMax">{ship.cargo.capacity}</span>
                    </div>
                </div>
                <progress className="shipOverview__cargoProgressBar" max={ship.cargo.capacity} value={ship.cargo.units}></progress>
            </div>
            <div className="shipOverview__integrity">
                <div className="shipOverview__integrityHeader">
                    <div className="shipOverview__titleWrapper">
                        <img className="shipOverview__integrityIcon" src=""></img>
                        <h3 className="shipOverview__integrityTitle">Condition</h3>
                    </div>
                    <div className="shipOverview__integrityLevel">
                        <span className="shipOverview__integrityCurrent">{ship.frame.condition}%</span>
                    </div>
                </div>
                <progress className="shipOverview__integrityProgressBar" max={ship.fuel.capacity} value={ship.fuel.current}></progress>
            </div>
        </div>
    )
}

export default ShipOverview;