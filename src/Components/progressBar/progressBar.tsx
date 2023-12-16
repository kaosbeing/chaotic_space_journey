import { useEffect, useState } from "react";
import "./progressBar.css";

const ProgressBar = ({ color, value, max }: { color: string, value: number, max: number }) => {
    const [progress, setProgress] = useState(0);

    let style = {
        width: progress + "%",
        backgroundColor: color,
    }

    useEffect(() => {
        max != 0 ? setProgress(value / max * 100) : setProgress(100);
    }, [value, max])

    return (
        <div className="progressBar">
            <div className="progressBar__progress" style={style}></div>
        </div>
    )
}

export default ProgressBar;