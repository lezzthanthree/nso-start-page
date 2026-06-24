import React, { useEffect, useState } from "react";

const Clock: React.FC = () => {
    const [time, setTime] = useState<string>(() =>
        new Date().toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
        }),
    );

    useEffect(() => {
        const interval = window.setInterval(() => {
            setTime(
                new Date().toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                }),
            );
        }, 1000);

        return () => {
            window.clearInterval(interval);
        };
    }, []);
    return (
        <div
            id="clock"
            className="start flex flex-row gap-2 items-center border-2 p-1 border-b-white border-r-white border-t-nso-purple border-l-nso-purple"
        >
            <p className="font-nso-dinkie-9px text-nso-purple text-xl">
                {time}
            </p>
        </div>
    );
};

export default Clock;
