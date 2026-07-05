import React, { useEffect } from "react";
import SpeedDialInputBox from "../../SpeedDialInputBox";
import Button from "../../Button";
import SettingsGroup from "../../Settings/SettingsGroup";
import SettingsGroupSection from "../../Settings/SettingsGroupSection";
import InputBox from "../../InputBox";
import { useSpeedDialState } from "../../../hooks/useSpeedDial";

const SpeedDialSettings: React.FC = () => {
    const { speedDial, initializeSpeedDial, addSpeedDial, deleteSpeedDial } =
        useSpeedDialState();

    useEffect(() => {
        initializeSpeedDial();
    }, []);

    return (
        <SettingsGroup header="Speed Dial">
            <SettingsGroupSection
                header="Greetings"
                description="Change the header of the Speed Dial."
            >
                <div className="flex flex-col gap-2">
                    <InputBox
                        value="Welcome back!"
                        label="Header"
                        onChange={() => {}}
                    />
                    <InputBox
                        value="Today is {date}, {time}."
                        label="Description"
                        footer="Custom parameters: {day} {date} {time}"
                        onChange={() => {}}
                    />
                </div>
            </SettingsGroupSection>
            <SettingsGroupSection
                header="Links"
                description="Add or remove links according to your preference."
            >
                <>
                    <p className="font-normal text-sm font-nso-dinkie-9px">
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
                        <table className="w-full table-fixed font-nso-dinkie-9px text-xl">
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
                        value="16"
                        label="Horizontal Gap"
                        onChange={() => {}}
                        type="number"
                        footer="The gap between individual links."
                    />
                    <InputBox
                        value="0"
                        label="Vertical Gap"
                        onChange={() => {}}
                        type="number"
                        footer="The gap between lines when links wrap onto a new line."
                    />
                </div>
            </SettingsGroupSection>
        </SettingsGroup>
    );
};

export default SpeedDialSettings;
