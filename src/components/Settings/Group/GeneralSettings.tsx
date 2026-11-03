import React, { useRef, useState } from "react";
import SettingsGroup from "../SettingsGroup";
import SettingsGroupSection from "../SettingsGroupSection";
import Checkbox from "../../UI/Checkbox";
import { useGeneralSettingsState } from "../../../hooks/useGeneralSettings";
import Button from "../../UI/Button";
import { defaultBackground } from "../../../data/Consts";

const GeneralSettings: React.FC = () => {
    const {
        hour24,
        hideSearchTip,
        audio,
        background,
        searchEngine,
        changeSettings,
        changeBackground,
        changeSearchEngine,
    } = useGeneralSettingsState();
    const fileInput = useRef<HTMLInputElement>(null);
    const [backgroundError, setBackgroundError] = useState("");

    const handleBackgroundUpload = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0];
        event.target.value = "";
        if (!file) return;

        if (!/^image\/(png|jpeg|webp|gif)$/.test(file.type)) {
            setBackgroundError("Choose a PNG, JPEG, WebP, or GIF image.");
            return;
        }
        if (file.size > 8 * 1024 * 1024) {
            setBackgroundError("Choose an image smaller than 8 MB.");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === "string") {
                void changeBackground(reader.result);
                setBackgroundError("");
            }
        };
        reader.onerror = () => {
            setBackgroundError("This image could not be read.");
        };
        reader.readAsDataURL(file);
    };

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
            <SettingsGroupSection
                header="Background"
                description="Choose a desktop background image."
            >
                <div className="flex flex-col gap-3">
                    <div
                        aria-label={
                            background
                                ? "Custom background preview"
                                : "Default background preview"
                        }
                        className="h-28 w-full max-w-sm border-2 border-nso-purple bg-center bg-cover"
                        style={{
                            backgroundImage: `url('${background ?? defaultBackground}')`,
                        }}
                    />
                    <input
                        ref={fileInput}
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/gif"
                        className="hidden"
                        onChange={handleBackgroundUpload}
                    />
                    <div className="flex flex-wrap gap-2">
                        <Button
                            label="Choose image"
                            icon="hn-image"
                            onClick={() => fileInput.current?.click()}
                        />
                        <Button
                            label="Restore default"
                            icon="hn-undo"
                            onClick={() => {
                                void changeBackground(null);
                                setBackgroundError("");
                            }}
                        />
                    </div>
                    {backgroundError && (
                        <p role="alert" className="text-red-700 text-sm">
                            {backgroundError}
                        </p>
                    )}
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
