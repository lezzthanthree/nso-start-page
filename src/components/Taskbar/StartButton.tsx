import React from "react";
import { useStartState } from "../../hooks/useStart";

const StartButton: React.FC = () => {
    const { active, setActive } = useStartState();
    return (
        <div
            id="start"
            className={`flex flex-row gap-2 items-center border-2 p-1 ${active ? "border-b-white border-r-white border-t-nso-purple border-l-nso-purple" : "border-t-white border-l-white border-b-nso-purple border-r-nso-purple"}`}
            onClick={() => {
                setActive(!active);
            }}
        >
            <img src="img/binbows.png" alt="" />
            <p className="    text-xl">START</p>
        </div>
    );
};

export default StartButton;
