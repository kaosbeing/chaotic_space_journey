import { useContext, useEffect, useState } from "react";
import { DashboardContext } from "../../Context/dashboard/DashboardContext";
import { Cooldown } from "../../Models/ShipInterface";

import "./cooldown.css";
import cooldownIcon from "../../assets/icons/cooldown.svg";

const CooldownComponent = ({ cooldown }: { cooldown: Cooldown | null }) => {
    const [timer, setTimer] = useState<number>(0);

    useEffect(() => {
        if (cooldown) {
            setTimer(cooldown.remainingSeconds);
        }

        const timerInterval = setInterval(() => {
            if (cooldown?.expiration) {
                const cooldownExpiration = new Date(cooldown.expiration).getTime();
                const timeLeft = Math.floor((cooldownExpiration - Date.now()) / 1000);

                setTimer(timeLeft);

                if (timeLeft === 0) {
                    console.log("Clearing timer");
                    clearInterval(timerInterval);
                }
            } else {
                setTimer(0);
                clearInterval(timerInterval);
            }
        }, 1000);

        return () => {
            clearInterval(timerInterval);
        };
    }, [cooldown]);

    return (
        <>
            <div className="cooldown">
                <div className="cooldown__header">
                    <img className="cooldown__icon" src={cooldownIcon} alt="Cooldown Icon" />
                    <h3 className="cooldown__title">Cooldown</h3>
                </div>
                <div className="cooldown__timerWrapper">
                    <span className="cooldown__timer">{timer}s</span>
                </div>
            </div>
        </>
    );
};

export default CooldownComponent;
