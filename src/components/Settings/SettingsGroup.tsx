import React from "react";

interface SettingsGroupProps {
    header?: string;
    children: React.ReactNode;
}

const SettingsGroup: React.FC<SettingsGroupProps> = ({
    header = "Endings",
    children,
}) => {
    return (
        <div id="speed-dial-settings" className="flex flex-col border-b-4 border-nso-purple pb-4">
            <div id="header">
                <p className="text-4xl font-bold">{header}</p>
            </div>
            <div id="settings-content" className="flex flex-col gap-4">
                {children}
            </div>
        </div>
    );
};

export default SettingsGroup;
