import { useEffect, useState } from "react";
import { Cargo, Cooldown, Frame, Fuel, ShipData } from "../../Models/ShipInterface";
import ProgressBar from "../progressBar/progressBar";
import "./shipOverview.css";

// Icons
import shipIcon from "../../assets/icons/ship.svg";
import fuelIcon from "../../assets/icons/fuel.svg";
import cargoIcon from "../../assets/icons/cargo.svg";
import integrityIcon from "../../assets/icons/condition.svg";
import shipImg from "../../assets/img/ships/interceptor.png";
import cooldownIcon from "../../assets/icons/cooldown.svg";

const ShipOverview = ({ symbol, frame, cargo, fuel, cooldown }: { symbol: string, frame: Frame, cargo: Cargo | null, fuel: Fuel | null, cooldown: Cooldown | null }) => {
    const [timer, setTimer] = useState(cooldown?.remainingSeconds || 0);

    useEffect(() => {
        if (cooldown && cooldown.expiration) {
            let remainingCD = Math.round((new Date(cooldown.expiration).getTime() - Date.now()) / 1000);
            setTimer(remainingCD >= 0 ? remainingCD : 0);
        } else {
            setTimer(0);
        }

        let intervalId: NodeJS.Timeout;

        if (timer > 0) {
            intervalId = setInterval(() => {
                console.log("tick");

                setTimer((time) => time > 0 ? time - 1 : 0);
            }, 1000);
        }

        return () => {
            clearInterval(intervalId)
        };
    }, [cooldown, timer]);

    return (
        <>
            {
                cargo && fuel && frame ? (

                    <div className="shipOverview">
                        <div className="shipOverview__header">
                            <img className="shipOverview__icon" src={shipIcon} />
                            <h2 className="shipOverview__title">Current Ship</h2>
                        </div>
                        <div className="shipOverview__hero">
                            <img className="shipOverview__heroImg" src={shipImg} />
                            <span className="shipOverview__shipType">{frame.name}</span>
                        </div>
                        <div className="shipOverview__symbol">{symbol}</div>
                        <div className="shipOverview__fuel">
                            <div className="shipOverview__fuelHeader">
                                <div className="shipOverview__progressTitleWrapper">
                                    <img className="shipOverview__fuelIcon" src={fuelIcon}></img>
                                    <h3 className="shipOverview__fuelTitle">Fuel</h3>
                                </div>
                                <div className="shipOverview__fuelLevel">
                                    <span className="shipOverview__fuelCurrent">{fuel.current}</span> / <span className="shipOverview__fuelMax">{fuel.capacity}</span>
                                </div>
                            </div>
                            <ProgressBar max={fuel.capacity} value={fuel.current} color="var(--confirm-2)"></ProgressBar>
                        </div>
                        <div className="shipOverview__cargo">
                            <div className="shipOverview__cargoHeader">
                                <div className="shipOverview__progressTitleWrapper">
                                    <img className="shipOverview__cargoIcon" src={cargoIcon}></img>
                                    <h3 className="shipOverview__cargoTitle">Cargo</h3>
                                </div>
                                <div className="shipOverview__cargoLevel">
                                    <span className="shipOverview__cargoCurrent">{cargo.units}</span> / <span className="shipOverview__cargoMax">{cargo.capacity}</span>
                                </div>
                            </div>
                            <ProgressBar max={cargo.capacity} value={cargo.units} color="#EA734D"></ProgressBar>
                        </div>
                        <div className="shipOverview__integrity">
                            <div className="shipOverview__integrityHeader">
                                <div className="shipOverview__progressTitleWrapper">
                                    <img className="shipOverview__integrityIcon" src={integrityIcon}></img>
                                    <h3 className="shipOverview__integrityTitle">Condition</h3>
                                </div>
                                <div className="shipOverview__integrityLevel">
                                    <span className="shipOverview__integrityCurrent">{frame.condition}%</span>
                                </div>
                            </div>
                            <ProgressBar max={100} value={frame.condition} color="var(--cancel)"></ProgressBar>
                        </div>
                        <div className="shipOverview__cooldownWrapper">
                            <img className="shipOverview__cooldownIcon" src={cooldownIcon} alt="" />
                            <span className="shipOverview__cooldownTimber">{timer}s</span>
                        </div>
                    </div>
                ) : (
                    <div>Loading</div>
                )
            }
        </>
    )
}

export default ShipOverview;