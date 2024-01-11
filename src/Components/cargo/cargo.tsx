import { Cargo as CargoModel, Item as ItemModel } from "../../Models/ShipInterface";
import cargoIcon from "/assets/icons/cargo.svg";
import "./cargo.css";

const Cargo = ({ cargo }: { cargo: CargoModel | null }) => {
    return (
        <div className="cargo">
            <div className="cargo__header">
                <img className="cargo__icon" src={cargoIcon} alt="" />
                <h3 className="cargo__title">Cargo</h3>
            </div>
            <div className="cargo__content">
                {cargo?.inventory.map((item: ItemModel) => (
                    <div key={item.symbol} className="cargo__item">
                        <span className="cargo__itemName">{item.name}</span>
                        <span className="cargo__itemUnits">x{item.units}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Cargo;