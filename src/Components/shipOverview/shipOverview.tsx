import { ShipData } from "../../Models/ShipInterface";
import ProgressBar from "../progressBar/progressBar";
import "./shipOverview.css";

import shipIcon from "../../assets/icons/ship.svg";
import fuelIcon from "../../assets/icons/fuel.svg";
import cargoIcon from "../../assets/icons/cargo.svg";
import integrityIcon from "../../assets/icons/condition.svg";
import shipImg from "../../assets/img/ships/interceptor.png";

const ShipOverview = ({ ship }: { ship: ShipData }) => {
    return (
        <div className="shipOverview">
            <div className="shipOverview__header">
                <img className="shipOverview__icon" src={shipIcon} />
                <h2 className="shipOverview__title">Current Ship</h2>
            </div>
            <div className="shipOverview__hero">
                <img className="shipOverview__heroImg" src={shipImg} />
                <span className="shipOverview__shipType">{ship.frame.name}</span>
            </div>
            <div className="shipOverview__symbol">{ship.symbol}</div>
            <div className="shipOverview__fuel">
                <div className="shipOverview__fuelHeader">
                    <div className="shipOverview__progressTitleWrapper">
                        <img className="shipOverview__fuelIcon" src={fuelIcon}></img>
                        <h3 className="shipOverview__fuelTitle">Fuel</h3>
                    </div>
                    <div className="shipOverview__fuelLevel">
                        <span className="shipOverview__fuelCurrent">{ship.fuel.current}</span> / <span className="shipOverview__fuelMax">{ship.fuel.capacity}</span>
                    </div>
                </div>
                <ProgressBar max={ship.fuel.capacity} value={ship.fuel.current} color="var(--confirm)"></ProgressBar>
            </div>
            <div className="shipOverview__cargo">
                <div className="shipOverview__cargoHeader">
                    <div className="shipOverview__progressTitleWrapper">
                        <img className="shipOverview__cargoIcon" src={cargoIcon}></img>
                        <h3 className="shipOverview__cargoTitle">Cargo</h3>
                    </div>
                    <div className="shipOverview__cargoLevel">
                        <span className="shipOverview__cargoCurrent">{ship.cargo.units}</span> / <span className="shipOverview__cargoMax">{ship.cargo.capacity}</span>
                    </div>
                </div>
                <ProgressBar max={ship.cargo.capacity} value={ship.cargo.units} color="var(--cancel)"></ProgressBar>
            </div>
            <div className="shipOverview__integrity">
                <div className="shipOverview__integrityHeader">
                    <div className="shipOverview__progressTitleWrapper">
                        <img className="shipOverview__integrityIcon" src={integrityIcon}></img>
                        <h3 className="shipOverview__integrityTitle">Condition</h3>
                    </div>
                    <div className="shipOverview__integrityLevel">
                        <span className="shipOverview__integrityCurrent">{ship.frame.condition}%</span>
                    </div>
                </div>
                <ProgressBar max={100} value={ship.frame.condition} color="red"></ProgressBar>
            </div>
            <div className="shipOverview__cooldownWrapper">
                <img className="shipOverview__cooldownIcon" src="" alt="" />
                <span className="shipOverview__cooldownTimber"></span>
            </div>
        </div>
    )
}

export default ShipOverview;