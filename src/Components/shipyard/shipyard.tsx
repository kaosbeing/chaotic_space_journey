import "./shipyard.css";
import { Shipyard as ShipyardData, ShipyardShip } from "../../Models/Shipyard"
import fuelIcon from "/assets/icons/fuel.svg";
import cargoIcon from "/assets/icons/cargo.svg";
import { Agent } from "../../Models/AgentInterface";
import ApiHandler from "../../ApiHandler";
import { AuthContext } from "../../Context/auth/AuthContext";
import { useContext } from "react";
import { SpacetradersContext } from "../../Context/spacetraders/SpacetradersContext";

const Shipyard = ({ shipyard, agent }: { shipyard: ShipyardData, agent: Agent }) => {
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
        const newFleet = [...STContext.fleet, response.ship];
        STContext.updateFleet(newFleet);
        STContext.updateAgent(response.agent);
    }

    return (
        <div className='shipyard'>
            <div className='shipyard__header'>
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
                        <button className={canBuy(ship) ? "shipyard__purchase" : "shipyard__purchase shipyard__purchase--disabled"} onClick={() => { if (canBuy(ship)) { buyShip(ship) } }} disabled={canBuy(ship)}>{ship.purchasePrice}</button>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default Shipyard