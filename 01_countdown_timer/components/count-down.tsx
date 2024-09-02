import { useState, useRef, useEffect, ChangeEvent } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function countdown() {
    const [duration, setDurration] = useState<number | string>("");

    const [timeleft, setTimeleft] = useState<number>(0);

    const [isActive, setisActive] = useState<boolean>(false);

    const [isPaused, setisPaused] = useState<boolean>(false);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handlesetdurration = (): void => {
        const numDuration = Number(duration);
        if (numDuration > 0) {
            setTimeleft(numDuration);
            setisActive(false);
            setisPaused(false);
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
    };


    const handlestart = (): void => {
        if (timeleft > 0) {
            setisActive(true);
            setisPaused(false);
        }
    };


    const handlepaused = (): void => {
        if (isActive) {
            setisPaused(true);
            setisActive(false);

            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
    };

    const handlerest = (): void => {
        setisActive(false);
        setisPaused(false);
        setTimeleft(typeof duration == "number" ? duration : 0);
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

    };


    useEffect(() => {
        if (isActive && !isPaused) {
            timerRef.current = setInterval(() => {
                setTimeleft((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timerRef.current!);
                        return 0;

                    }
                    return prevTime - 1;
                })

            }, 1000);
        }
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };

    }, [isActive, isPaused
    ]);


const formattime = (time: number): string => {
const minutes = Math.floor(time / 60);
const seconds = time % 60;


}








}