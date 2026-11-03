import React from "react";
import SettingsGroup from "../SettingsGroup";
import SettingsGroupSection from "../SettingsGroupSection";
import Checkbox from "../../UI/Checkbox";
import { useGeneralSettingsState } from "../../../hooks/useGeneralSettings";

const GeneralSettings: React.FC = () => {
    const {
        hour24,
        hideSearchTip,
        audio,
        searchEngine,
        changeSettings,
        changeSearchEngine,
    } = useGeneralSettingsState();

    return (
        <SettingsGroup header="General">
            <SettingsGroupSection
                header="Search Engine"
                description="Choose which search provider to use."
            >
                <div className="flex flex-col gap-1 max-w-sm">
                    <label htmlFor="search-engine" className="text-xl">
                        Search engine
                    </label>
                    <select
                        id="search-engine"
                        value={searchEngine}
                        onChange={(event) => {
                            void changeSearchEngine(
                                event.target.value as typeof searchEngine,
                            );
                        }}
                        className="border-2 text-xl border-b-white border-r-white border-t-nso-purple border-l-nso-purple bg-nso-light-pink p-2 w-full min-w-0"
                    >
                        <option value="google">Google</option>
                        <option value="duckduckgo">DuckDuckGo</option>
                        <option value="bing">Bing</option>
                        <option value="yahoo">Yahoo</option>
                        <option value="ecosia">Ecosia</option>
                        <option value="brave">Brave Search</option>
                    </select>
                </div>
            </SettingsGroupSection>
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
