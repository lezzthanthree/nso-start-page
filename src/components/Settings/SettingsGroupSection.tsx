import React from "react";

interface SettingsGroupSectionProps {
    header?: string;
    description?: string;
    children: React.ReactNode;
}

const SettingsGroupSection: React.FC<SettingsGroupSectionProps> = ({
    header = "Internet Overdose",
    description = "Please take only the recommended internet dosage.",
    children,
}) => {
    return (
        <div id="settings-content-section" className="flex flex-col gap-1 border-t-4 pt-4  border-nso-purple">
            <div>
                <p
                    id="settings-content-section-header"
                    className="font-nso-dinkie-9px text-2xl"
                >
                    {header}
                </p>
                <p
                    id="settings-content-section-description"
                    className="font-nso-dinkie-9px text-xl"
                >
                    {description}
                </p>
            </div>
            <div className="w-full overflow-auto flex flex-col">{children}</div>
        </div>
    );
};

export default SettingsGroupSection;
