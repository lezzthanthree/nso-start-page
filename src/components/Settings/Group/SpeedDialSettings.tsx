import React, { useEffect } from "react";
import SpeedDialInputBox from "../../UI/SpeedDialInputBox";
import Button from "../../UI/Button";
import SettingsGroup from "../../Settings/SettingsGroup";
import SettingsGroupSection from "../../Settings/SettingsGroupSection";
import InputBox from "../../UI/InputBox";
import { useSpeedDialState } from "../../../hooks/useSpeedDial";

const SpeedDialSettings: React.FC = () => {
    const {
        speedDial,
        initializeSpeedDial,
        addSpeedDial,
        deleteSpeedDial,
        reorderSpeedDial,
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
                        <table className="w-full min-w-3xl table-fixed text-xl">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>URL</th>
                                    <th>Icon</th>
                                    <th>Color</th>
                                    <th className="w-20 text-center">Order</th>
                                    <th className="w-16 pb-12" />
                                </tr>
                            </thead>
                            <tbody>
                                {speedDial.map((link, index) => (
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
                                        <td className="w-20">
                                            <div className="flex justify-center gap-1">
                                                <button
                                                    type="button"
                                                    aria-label={`Move ${link.name} up`}
                                                    title="Move up"
                                                    disabled={index === 0}
                                                    onClick={() => {
                                                        void reorderSpeedDial(
                                                            link.id,
                                                            "up",
                                                        );
                                                    }}
                                                    className="h-9 w-9 border-2 border-t-white border-l-white border-b-nso-purple border-r-nso-purple bg-nso-white disabled:opacity-40 disabled:cursor-not-allowed active:border-b-white active:border-r-white active:border-t-nso-purple active:border-l-nso-purple"
                                                >
                                                    ↑
                                                </button>
                                                <button
                                                    type="button"
                                                    aria-label={`Move ${link.name} down`}
                                                    title="Move down"
                                                    disabled={
                                                        index ===
                                                        speedDial.length - 1
                                                    }
                                                    onClick={() => {
                                                        void reorderSpeedDial(
                                                            link.id,
                                                            "down",
                                                        );
                                                    }}
                                                    className="h-9 w-9 border-2 border-t-white border-l-white border-b-nso-purple border-r-nso-purple bg-nso-white disabled:opacity-40 disabled:cursor-not-allowed active:border-b-white active:border-r-white active:border-t-nso-purple active:border-l-nso-purple"
                                                >
                                                    ↓
                                                </button>
                                            </div>
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
                    <div className="flex max-w-sm flex-col gap-1">
                        <div className="flex items-baseline justify-between gap-2">
                            <label htmlFor="horizontal-gap" className="text-xl">
                                Horizontal Gap
                            </label>
                            <output htmlFor="horizontal-gap" className="text-lg">
                                {settings.gap.horizontal} px
                            </output>
                        </div>
                        <input
                            id="horizontal-gap"
                            type="range"
                            min="0"
                            max="128"
                            step="1"
                            value={settings.gap.horizontal}
                            aria-valuetext={`${settings.gap.horizontal} pixels`}
                            onChange={(event) => {
                                void editGapSettings(
                                    Number(event.target.value),
                                    "horizontal",
                                );
                            }}
                            className="nso-range w-full"
                        />
                        <p className="text-base">
                            The gap between individual links.
                        </p>
                    </div>
                    <div className="flex max-w-sm flex-col gap-1">
                        <div className="flex items-baseline justify-between gap-2">
                            <label htmlFor="vertical-gap" className="text-xl">
                                Vertical Gap
                            </label>
                            <output htmlFor="vertical-gap" className="text-lg">
                                {settings.gap.vertical} px
                            </output>
                        </div>
                        <input
                            id="vertical-gap"
                            type="range"
                            min="0"
                            max="64"
                            step="1"
                            value={settings.gap.vertical}
                            aria-valuetext={`${settings.gap.vertical} pixels`}
                            onChange={(event) => {
                                void editGapSettings(
                                    Number(event.target.value),
                                    "vertical",
                                );
                            }}
                            className="nso-range w-full"
                        />
                        <p className="text-base">
                            The gap between lines when links wrap onto a new line.
                        </p>
                    </div>
                </div>
            </SettingsGroupSection>
        </SettingsGroup>
    );
};

export default SpeedDialSettings;
