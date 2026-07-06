import React, { useEffect } from "react";
import SpeedDialInputBox from "../../SpeedDialInputBox";
import Button from "../../Button";
import SettingsGroup from "../../Settings/SettingsGroup";
import SettingsGroupSection from "../../Settings/SettingsGroupSection";
import InputBox from "../../InputBox";
import { useSpeedDialState } from "../../../hooks/useSpeedDial";

const SpeedDialSettings: React.FC = () => {
    const {
        speedDial,
        initializeSpeedDial,
        addSpeedDial,
        deleteSpeedDial,
        editGreetingSettings,
        editGapSettings,
        settings,
    } = useSpeedDialState();

    useEffect(() => {
        initializeSpeedDial();
    }, []);

    if (!settings) return;

    return (
        <SettingsGroup header="Speed Dial">
            <SettingsGroupSection
                header="Greetings"
                description="Change the header of the Speed Dial."
            >
                <div className="flex flex-col gap-2">
                    <InputBox
                        value={settings?.header}
                        label="Header"
                        onChange={(newValue: string | number) => {
                            const value = String(newValue);
                            void editGreetingSettings(value, "header");
                        }}
                    />
                    <InputBox
                        value={settings?.description}
                        label="Description"
                        footer="Custom parameters: {day} {date} {time}"
                        onChange={(newValue: string | number) => {
                            const value = String(newValue);
                            void editGreetingSettings(value, "description");
                        }}
                    />
                </div>
            </SettingsGroupSection>
            <SettingsGroupSection
                header="Links"
                description="Add or remove links according to your preference."
            >
                <>
                    <p className="font-normal text-sm  ">
                        For the list of icons, visit{" "}
                        <a
                            href="https://pixeliconlibrary.com/"
                            className="underline"
                            target="_blank"
                        >
                            pixeliconlibrary.com
                        </a>
                        .
                    </p>
                    {speedDial.length > 0 && (
                        <table className="w-full table-fixed   text-xl">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>URL</th>
                                    <th>Icon</th>
                                    <th>Color</th>
                                    <th className="w-16 pb-12" />
                                </tr>
                            </thead>
                            <tbody>
                                {speedDial.map((link) => (
                                    <tr key={link.id}>
                                        <td className="text-center">
                                            <SpeedDialInputBox
                                                id={link.id}
                                                type="name"
                                                value={link.name}
                                            />
                                        </td>
                                        <td className="text-center">
                                            <SpeedDialInputBox
                                                id={link.id}
                                                type="url"
                                                value={link.url}
                                            />
                                        </td>
                                        <td className="text-center">
                                            <SpeedDialInputBox
                                                id={link.id}
                                                type="icon"
                                                value={link.icon}
                                            />
                                        </td>
                                        <td className="text-center">
                                            <SpeedDialInputBox
                                                id={link.id}
                                                type="color"
                                                value={link.color}
                                            />
                                        </td>
                                        <td className="w-16 flex justify-center items-center">
                                            <Button
                                                label=""
                                                icon="hn-times"
                                                onClick={() => {
                                                    deleteSpeedDial(link.id);
                                                }}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    <Button
                        label="Add"
                        icon="hn-plus-solid"
                        onClick={addSpeedDial}
                    />
                </>
            </SettingsGroupSection>
            <SettingsGroupSection
                header="Spacing"
                description="Define the horizontal and vertical spacing between links."
            >
                <div className="flex flex-col gap-2">
                    <InputBox
                        value={settings?.gap.horizontal}
                        label="Horizontal Gap"
                        onChange={(newValue: string | number) => {
                            const numeric = Number(newValue);
                            void editGapSettings(numeric, "horizontal");
                        }}
                        type="number"
                        footer="The gap between individual links."
                    />
                    <InputBox
                        value={settings?.gap.vertical}
                        label="Vertical Gap"
                        onChange={(newValue: string | number) => {
                            const numeric = Number(newValue);
                            void editGapSettings(numeric, "vertical");
                        }}
                        type="number"
                        footer="The gap between lines when links wrap onto a new line."
                    />
                </div>
            </SettingsGroupSection>
        </SettingsGroup>
    );
};

export default SpeedDialSettings;
