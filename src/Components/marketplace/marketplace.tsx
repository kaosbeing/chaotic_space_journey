import { Market, TradeGood } from "../../Models/MarketInterface"
import marketplaceIcon from "/assets/icons/marketplace.svg"
import "./marketplace.css"
import { Ship } from "../../Models/ShipInterface"
import { useContext, useState } from "react"
import { Agent } from "../../Models/AgentInterface"
import ApiHandler from "../../ApiHandler"
import { AuthContext } from "../../Context/auth/AuthContext"
import { SpacetradersContext } from "../../Context/spacetraders/SpacetradersContext"

const Marketplace = ({ market, ship, agent }: { market: Market, ship: Ship, agent: Agent }) => {
    const authContext = useContext(AuthContext);
    const STContext = useContext(SpacetradersContext);
    const [displayModal, setDisplayModal] = useState<boolean>(false)
    const [modalType, setModalType] = useState<"BUY" | "SELL">("BUY")
    const [modalTradeGood, setModalTradeGood] = useState<TradeGood | null>(null)
    const [modalTradeUnits, setModalTradeUnits] = useState<number>(0)

    const renderTradeButtons = (tradegood: TradeGood) => {
        const canBuy = agent.credits >= tradegood.purchasePrice && ship.nav.status === "DOCKED";
        const canSell = ship.cargo.inventory.some((item) => item.symbol === tradegood.symbol) && ship.nav.status === "DOCKED";

        return (
            <>
                <button
                    onClick={(e) => { if (canBuy) { e.stopPropagation(); setModalType("BUY"); setModalTradeGood(tradegood); setDisplayModal(true); } }}
                    className={canBuy ? "tradegoods__action" : "tradegoods__action--disabled tradegoods__action"}
                    disabled={!canBuy}
                >
                    {tradegood.purchasePrice}
                </button>
                <button
                    onClick={(e) => { if (canSell) { e.stopPropagation(); setModalType("SELL"); setModalTradeGood(tradegood); setDisplayModal(true); } }}
                    className={canSell ? "tradegoods__action" : "tradegoods__action--disabled tradegoods__action"}
                    disabled={!canSell}
                >
                    {tradegood.sellPrice}
                </button>
            </>
        );
    }

    // Everything used by the sell and buy modal
    const renderTradeModal = () => {

        const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (modalTradeGood) {
                let response;
                if (modalType === "BUY") {
                    response = await ApiHandler.postBuy(ship.symbol, modalTradeGood.symbol, modalTradeUnits, authContext.token);
                } else {
                    response = await ApiHandler.postSell(ship.symbol, modalTradeGood.symbol, modalTradeUnits, authContext.token);
                }
                if (response) {
                    STContext.updateShip({ ...ship, cargo: response.cargo });
                    STContext.updateAgent(response.agent);
                }
            }
            setDisplayModal(false);
        }

        if (!displayModal || !modalTradeGood) {
            return (<></>)
        }

        return (
            <div onKeyDown={(e) => { if (e.key === "Escape") { setDisplayModal(false) } }} onClick={() => { setDisplayModal(false); }} className="trademodal">
                <div onKeyDown={(e) => { e.stopPropagation() }} onClick={(e) => { e.stopPropagation() }} className="trademodal__content">
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
                <img className="marketplace__icon" src={marketplaceIcon} alt="" />
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

export default Marketplace