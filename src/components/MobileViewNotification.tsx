import React from "react";
import { useExperimentalState } from "../hooks/useExperimental";

const MobileViewNotification: React.FC = () => {
    const { experimental } = useExperimentalState();

    if (experimental) return;

    return (
        <div className="absolute w-full h-full bg-[#000000ee] z-9999999999999 lg:hidden flex flex-col justify-center items-center align-middle text-nso-white   text-2xl p-4">
            <p className="text-center">
                This application doesn't fully support mobile yet.
            </p>
            <p className="text-center">
                For best experience, set your new tab start page on desktop
                instead.
            </p>
        </div>
    );
};

export default MobileViewNotification;
