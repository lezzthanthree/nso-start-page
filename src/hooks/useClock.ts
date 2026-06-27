import { useEffect, useState } from "react";

export const useClock = () => {
    const [clock, setClock] = useState<Date>(() => new Date());

    const [hour12, setHour12] = useState<string>(
        clock.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
        }),
    );

    const [hour24, setHour24] = useState<string>(
        clock.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        }),
    );

    const [date, setDate] = useState<string>(
        clock.toLocaleDateString([], {
            month: "numeric",
            day: "numeric",
            year: "numeric",
        }),
    );

    useEffect(() => {
        const interval = window.setInterval(() => {
            const clock = new Date();
            setClock(clock);
            setHour12(
                clock.toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                }),
            );
            setHour24(
                clock.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                }),
            );
            setDate(
                clock.toLocaleDateString([], {
                    month: "numeric",
                    day: "numeric",
                    year: "numeric",
                }),
            );
        }, 1000);

        return () => {
            window.clearInterval(interval);
        };
    }, []);

    return {
        clock,
        hour12,
        hour24,
        date,
    };
};
