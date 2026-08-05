import React from "react";
import SettingsGroup from "../SettingsGroup";
import SettingsGroupSection from "../SettingsGroupSection";
import Checkbox from "../../UI/Checkbox";
import { useGeneralSettingsState } from "../../../hooks/useGeneralSettings";

const GeneralSettings: React.FC = () => {
    const { hour24, hideSearchTip, audio, changeSettings } = useGeneralSettingsState();

    return (
        <SettingsGroup header="General">
            <SettingsGroupSection header="Toggles" description="">
                <div className="flex flex-col gap-2">
                    <Checkbox
                        id="hour24"
                        label="Use 24-hour clock"
                        state={hour24}
                        onClick={() => {
                            changeSettings("hour24", !hour24);
                        }}
                    />
                    <Checkbox
                        id="audio"
                        label="Enable audio"
                        state={audio}
                        onClick={() => {
                            changeSettings("audio", !audio);
                        }}
                    />
                    <Checkbox
                        id="hideSearchTip"
                        label="Hide search tip on Speed Dial"
                        state={hideSearchTip}
                        onClick={() => {
                            changeSettings("hideSearchTip", !hideSearchTip);
                        }}
                    />
                </div>
            </SettingsGroupSection>
        </SettingsGroup>
    );
};

export default GeneralSettings;
