import React, { useState } from "react";
import { useClock } from "../../hooks/useClock";

const Clock: React.FC = () => {
    const [is24] = useState(false);
    const { date, hour12, hour24 } = useClock();
    return (
        <div
            id="clock"
            className="start flex flex-row gap-2 items-center border-2 p-1 border-b-white border-r-white border-t-nso-purple border-l-nso-purple"
        >
            <div className="flex flex-row gap-2">
                <p className="font-nso-dinkie-9px text-nso-purple text-xl">
                    {date}
                </p>
                <p className="font-nso-dinkie-9px text-nso-purple text-xl">
                    {is24 ? `${hour24}` : `${hour12}`}
                </p>
            </div>
        </div>
    );
};

export default Clock;
