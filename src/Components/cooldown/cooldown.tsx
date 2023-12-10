import { useContext, useEffect, useState } from "react";
import { DashboardContext } from "../../Context/dashboard/DashboardContext";
import { Cooldown } from "../../Models/ShipInterface";

import "./cooldown.css";
import cooldownIcon from "../../assets/icons/cooldown.svg";

const CooldownComponent = () => {
    const dashboardContext = useContext(DashboardContext);

    const [timer, setTimer] = useState<number>(0);

    const calculateTimer = () => {
        if (dashboardContext.ship) {
            const cooldownExpiration = new Date(dashboardContext.ship?.cooldown.expiration).getTime();
            const timeLeft = Math.floor((cooldownExpiration - Date.now()) / 1000)

            setTimer(timeLeft);

            if (timeLeft == 0) {
                clearInterval(interval);
            }
        }

    }

    const interval = setInterval(() => {
        console.log(timer);

        if ((timer) > 0) {
            calculateTimer();
        }
    }, 1000)

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