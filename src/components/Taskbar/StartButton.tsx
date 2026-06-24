import React from "react";

const StartButton: React.FC = () => {
    
    return (
        <div
            id="start"
            className="start flex flex-row gap-2 items-center border-2 p-1 border-t-white border-l-white border-b-nso-purple border-r-nso-purple"
        >
            <img src="img/binbows.png" alt="" />
            <p className="font-nso-dinkie-9px text-nso-purple text-xl">START</p>
        </div>
    );
};

export default StartButton;
