import { Market } from "../../Models/MarketInterface"
import marketplaceIcon from "/assets/icons/marketplace.svg"
import "./marketplace.css"

const marketplace = ({ market }: { market: Market }) => {
    return (
        <div className="marketplace">
            <div className="marketplace__header">
                <img className="marketplace__icon" src={marketplaceIcon} />
                <h3 className="marketplace__title">Marketplace</h3>
            </div>
            <div className="marketplace__tradegoods">
                {market ? market.tradeGoods?.map((tradegood) => (
                    <div>
                        <div>
                            {tradegood.symbol}
                        </div>
                        <div>
                            Buy for {tradegood.purchasePrice}
                        </div>
                        <div>
                            Sell for {tradegood.sellPrice}
                        </div>
                    </div>
                ))
                    : (
                        <div>Loading</div>
                    )}
            </div>
        </div>
    )
}

export default marketplace