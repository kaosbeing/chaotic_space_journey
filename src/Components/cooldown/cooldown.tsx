import { useContext, useEffect, useState } from "react";
import { DashboardContext } from "../../Context/dashboard/DashboardContext";
import { Cooldown } from "../../Models/ShipInterface";

import "./cooldown.css";
import cooldownIcon from "../../assets/icons/cooldown.svg";

const CooldownComponent = () => {
    const dashboardContext = useContext(DashboardContext);

    const [timer, setTimer] = useState<number | undefined>(0);

    useEffect(() => {
        setTimer(dashboardContext.ship?.cooldown.remainingSeconds);

        if (timer) {
            const interval = setInterval(() => {
                console.log(timer);
                if ((timer - 1) >= 0) {
                    setTimer(timer - 1);
                } else {
                    setTimer(0);
                    clearInterval(interval);
                }
            }, 1000)
        }
    }, [dashboardContext.ship])

    return (
        <>
            <div className="cooldown">
                <div className="cooldown__header">
                    <img className="cooldown__icon" src={cooldownIcon} />
                    <h3 className="cooldown__title">Cooldown</h3>
                </div>
                <div className="cooldown__timerWrapper">
                    <span className="cooldown__timer">{timer ? timer : 0}s</span>
                </div>
            </div>
        </>
    );
}

export default CooldownComponent;