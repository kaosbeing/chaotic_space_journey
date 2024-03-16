import "./shipyard.css";
import { Shipyard as ShipyardData, ShipyardShip } from "../../Models/ShipyardInterface"
import fuelIcon from "/assets/icons/fuel.svg";
import cargoIcon from "/assets/icons/cargo.svg";
import shipyardIcon from "/assets/icons/shipyard.svg";
import { Agent } from "../../Models/AgentInterface";
import ApiHandler from "../../ApiHandler";
import { AuthContext } from "../../Context/auth/AuthContext";
import { useContext } from "react";
import { SpacetradersContext } from "../../Context/spacetraders/SpacetradersContext";

const Shipyard = ({ shipyard, agent, display, close }: { shipyard: ShipyardData, agent: Agent, display: boolean, close: () => void }) => {
    const { token } = useContext(AuthContext);
    const STContext = useContext(SpacetradersContext);

    const renderCargoCapacity = (ship: ShipyardShip) => {
        let cargo = 0;
        ship.modules?.forEach((module) => {
            if (module.symbol === "MODULE_CARGO_HOLD_I" || module.symbol === "MODULE_CARGO_HOLD_II" || module.symbol === "MODULE_CARGO_HOLD_III") {
                cargo += module.capacity ?? 0;
            }
        })

        return (cargo);
    }

    const canBuy = (ship: ShipyardShip): boolean => {
        if (agent.credits >= ship.purchasePrice) {
            return true;
        } else {
            return false;
        }
    }

    const buyShip = async (ship: ShipyardShip) => {
        const response = await ApiHandler.postBuyShip(ship.type, shipyard.symbol, token);
        if (response) {
            const newFleet = [...STContext.fleet, response.ship];
            STContext.updateFleet(newFleet);
            STContext.updateAgent(response.agent);
        }
    }

    return (
        <>
            {display && (
                <div onKeyDown={(e) => { (e.key === "Escape" && close()) }} onClick={() => { close() }} className="shipyard__wrapper">
                    <div className="shipyard__scrollable">
                        <div onClick={(e) => { e.stopPropagation() }} className='shipyard'>
                            <div className='shipyard__header'>
                                <img className="shipyard__icon" src={shipyardIcon} alt="" />
                                <h3 className='shipyard__title'>Shipyard</h3>
                            </div>
                            <div className='shipyard__ships'>
                                {shipyard.ships?.map((ship) => (
                                    <div key={ship.type} className="shipyard__ship">
                                        <div className="shipyard__shipName">{ship.name}</div>
                                        <div className="shipyard__shipinfos">
                                            <div className="shipyard__shipStats">
                                                <img src={fuelIcon} alt="" />
                                                <span>{ship.frame.fuelCapacity}</span>
                                            </div>
                                            <div className="shipyard__shipStats">
                                                <img src={cargoIcon} alt="" />
                                                <span>{renderCargoCapacity(ship)}</span>
                                            </div>
                                        </div>
                                        <div>Mounts : {ship.mounts?.map((mount) => <span className="shipyard__shipmount" key={mount.name}>{mount.name}</span>)}</div>
                                        <div>Modules : {ship.modules?.map((module) => <span className="shipyard__shipmodule" key={module.name}>{module.name}</span>)}</div>
                                        <p className="shipyard__shipDesc">{ship.description}</p>
                                        <button className={canBuy(ship) ? "shipyard__purchase" : "shipyard__purchase shipyard__purchase--disabled"} onClick={() => { if (canBuy(ship)) { buyShip(ship) } }} disabled={!canBuy(ship)}>{ship.purchasePrice}</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Shipyard