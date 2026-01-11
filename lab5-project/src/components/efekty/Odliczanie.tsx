import { useState, useEffect } from "react";

export default function Odliczanie() {
    const [count, setCount] = useState(150);
    const [intervalId, setIntervalId] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [buttonText, setButtonText] = useState("Start");

    const startTimer = () => {
        const id = setInterval(() => {
            setCount(c => c - 1);
        }, 100);
        setIntervalId(id);
    };

    const stopTimer = () => {
        clearInterval(intervalId);
        setIntervalId(null);
    };

    useEffect(() => {
        if(count <= 0){
            setIsRunning(false);
            setIsButtonDisabled(true);
        }
    }, [count]);

    useEffect(() => {
        if(isRunning) {
            startTimer();
        }
        else
            stopTimer();
        return stopTimer;

    }, [isRunning]);

    useEffect(() => {
        if(isButtonDisabled)
            setButtonText("Odliczanie zakończone");
        else if(isRunning)
            setButtonText("Stop");
        else
            setButtonText("Start");
    }, [isButtonDisabled, isRunning]);

    return (<>
        <div>{(count / 10).toFixed(1)}</div>
        <button
            onClick={() => setIsRunning(!isRunning)}
            disabled={isButtonDisabled}
        >{buttonText}</button>
        </>);
}
