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
        <div id="speed-dial-settings" className="flex flex-col">
            <div id="header">
                <p className="font-nso-pixelmplus-b text-4xl">{header}</p>
            </div>
            <div id="settings-content" className="flex flex-col gap-4">
                {children}
            </div>
        </div>
    );
};

export default SettingsGroup;
