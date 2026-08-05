import React, { useState } from "react";
import { Window } from "../UI/Window";
import Button from "../UI/Button";
import { useSpeedDialState } from "../../hooks/useSpeedDial";
class InternetOverdose extends Error {
    constructor() {
        super();
        this.name = "InternetOverdose";
        this.message = "Please take only the recommended internet dosage.";
    }
}

const Crash: React.FC = () => {
    throw new InternetOverdose();
    return <></>;
};

const DeveloperWindow: React.FC = () => {
    const [crash, setCrash] = useState(false);
    const { default: speedDialDefault } = useSpeedDialState();
    return (
        <Window title="Developer Mode" id="developer">
            <div className="w-4xl flex flex-col gap-4    p-4 overflow-y-scroll">
                <div id="header">
                    <p className="font-nso-pressstart-2p text-4xl">
                        Developer Mode
                    </p>
                </div>
                <div>
                    <p className="font-normal  ">
                        Some features are enabled or disabled in developer mode.
                    </p>
                    <ul className="font-normal   list-disc pl-4">
                        <li>
                            Speed Dial links will not redirect to reduce refresh
                            times.
                        </li>
                        <li>Notification about mobile view is disabled.</li>
                        <li>
                            BSOD Sound when encountering an error is shorter.
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col">
                    <p className="text-2xl">Options</p>
                    <Button
                        label="Intentionally Crash"
                        onClick={() => {
                            setCrash(true);
                        }}
                    />
                    <Button
                        label="Reset Speed Dial to default"
                        onClick={() => {
                            speedDialDefault();
                        }}
                    />
                </div>
            </div>
            {crash && <Crash />}
        </Window>
    );
};

export default DeveloperWindow;
