import { useEffect, useState } from "react";

export const useClock = () => {
    const [clock, setClock] = useState<Date>(new Date());

    useEffect(() => {
        const interval = window.setInterval(() => {
            setClock(new Date());
        }, 1000);

        return () => window.clearInterval(interval);
    }, []);

    if (!clock) {
        return {
            clock: new Date(),
            hour12: "",
            hour24: "",
            hour12complete: "",
            hour24complete: "",
            weekday: "",
            date: "",
            dateComplete: "",
        };
    }

    return {
        clock,
        hour12: clock.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
        }),
        hour24: clock.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        }),
        hour12complete: clock.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
        }),
        hour24complete: clock.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        }),
        weekday: clock.toLocaleDateString([], { weekday: "long" }),
        date: clock.toLocaleDateString([], {
            month: "numeric",
            day: "numeric",
            year: "numeric",
        }),
        dateComplete: clock.toLocaleDateString([], {
            month: "long",
            day: "numeric",
            year: "numeric",
        }),
    };
};
