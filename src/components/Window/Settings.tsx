import React from "react";
import { Window } from "../Window";
import SpeedDialSettings from "../Settings/Group/SpeedDialSettings";

const Settings: React.FC = () => {
    return (
        <Window title="System Settings" id="settings">
            <div className="w-5xl flex flex-col gap-4 h-[60vh]   p-4 overflow-y-scroll">
                <div id="header">
                    <p className="font-nso-pressstart-2p text-4xl">System Settings</p>
                </div>
                <SpeedDialSettings />
            </div>
        </Window>
    );
};

export default Settings;
