import { Market, TradeGood } from "../../Models/MarketInterface"
import marketplaceIcon from "/assets/icons/marketplace.svg"
import "./marketplace.css"
import { Ship } from "../../Models/ShipInterface"
import { useContext, useState } from "react"
import { Agent } from "../../Models/AgentInterface"
import ApiHandler from "../../ApiHandler"
import { AuthContext } from "../../Context/auth/AuthContext"
import { SpacetradersContext } from "../../Context/spacetraders/SpacetradersContext"

const marketplace = ({ market, ship, agent }: { market: Market, ship: Ship, agent: Agent }) => {
    const authContext = useContext(AuthContext);
    const STContext = useContext(SpacetradersContext);
    const [displayModal, setDisplayModal] = useState<boolean>(false)
    const [modalType, setModalType] = useState<"BUY" | "SELL">("BUY")
    const [modalTradeGood, setModalTradeGood] = useState<TradeGood | null>(null)
    const [modalTradeUnits, setModalTradeUnits] = useState<number>(0)

    const renderTradeButtons = (tradegood: TradeGood) => {
        const canSell = ship.cargo.inventory.some((item) => item.symbol === tradegood.symbol) && ship.nav.status === "DOCKED";
        const canBuy = agent.credits >= tradegood.purchasePrice && ship.nav.status === "DOCKED";

        if (canSell) {
            return (
                <>
                    <button onClick={(e) => { e.stopPropagation(); setModalType("BUY"); setModalTradeGood(tradegood); setDisplayModal(true); }} className="tradegoods__action">{tradegood.purchasePrice}</button>
                    <button onClick={(e) => { e.stopPropagation(); setModalType("SELL"); setModalTradeGood(tradegood); setDisplayModal(true); }} className="tradegoods__action" > {tradegood.sellPrice}</button>
                </>
            );
        } else {
            return (
                <>
                    <button onClick={(e) => { e.stopPropagation(); setModalType("BUY"); setModalTradeGood(tradegood); setDisplayModal(true); }} className="tradegoods__action">{tradegood.purchasePrice}</button>
                    <button className="tradegoods__action tradegoods__action--disabled" disabled > {tradegood.sellPrice}</button>
                </>
            );
        }
    }

    // Everything used by the sell and buy modal
    const renderTradeModal = () => {

        const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (modalTradeGood) {
                if (modalType === "BUY") {
                    var response = await ApiHandler.postBuy(ship.symbol, modalTradeGood.symbol, modalTradeUnits, authContext.token);
                } else {
                    var response = await ApiHandler.postSell(ship.symbol, modalTradeGood.symbol, modalTradeUnits, authContext.token);
                }
                STContext.updateShip({ ...ship, cargo: response.cargo });
                STContext.updateAgent(response.agent);
            }
            setDisplayModal(false);
        }

        if (!displayModal || !modalTradeGood) {
            return (<></>)
        }

        return (
            <div onClick={() => { setDisplayModal(false); }} className="trademodal">
                <div onClick={(e) => { e.stopPropagation() }} className="trademodal__content">
                    <h3 className="trademodal__title">{modalType} : {modalTradeGood?.symbol}</h3>
                    <div className="trademodal__infos">
                        <div className="trademodal__unitprice">
                            <span className="trademodal__infotitle">Unit Price</span>
                            <span className="trademodal__infocontent">{modalType === "BUY" ? modalTradeGood?.purchasePrice : modalTradeGood?.sellPrice}</span>
                        </div>
                        <div className="trademodal__tradeVolume">
                            <span className="trademodal__infotitle">Max per trade</span>
                            <span>{modalTradeGood?.tradeVolume}</span>
                        </div>
                    </div>
                    <form className="trademodal__form" onSubmit={(e) => formSubmit(e)}>
                        <input onInput={(e) => { setModalTradeUnits(parseInt((e.target as HTMLInputElement).value)) }} className="trademodal__input" type="number" placeholder="Quantity" name="" id="" />
                        <button className="trademodal__button">{modalType === "BUY" ? "Buy" : "SELL"}</button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className="marketplace">
            <div className="marketplace__header">
                <img className="marketplace__icon" src={marketplaceIcon} />
                <h3 className="marketplace__title">Marketplace</h3>
            </div>
            <div className="marketplace__tradegoods">
                {market ? market.tradeGoods?.map((tradegood) => (
                    <div key={tradegood.symbol} className="tradegood">
                        <div className="tradegood__symbol">
                            {tradegood.symbol}
                        </div>
                        <div className="tradegoods__actions">
                            {renderTradeButtons(tradegood)}
                        </div>
                    </div>
                ))
                    : (
                        <div>Loading</div>
                    )}
            </div>
            {renderTradeModal()}
        </div>
    )
}

export default marketplace