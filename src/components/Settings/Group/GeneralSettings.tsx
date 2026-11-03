import React, { useRef, useState } from "react";
import SettingsGroup from "../SettingsGroup";
import SettingsGroupSection from "../SettingsGroupSection";
import Checkbox from "../../UI/Checkbox";
import {
    useGeneralSettingsState,
    type BackgroundColorDepth,
} from "../../../hooks/useGeneralSettings";
import Button from "../../UI/Button";
import BackgroundImage from "../../UI/BackgroundImage";
import { defaultBackground } from "../../../data/Consts";
import {
    eightBitPalette,
    fourBitPalette,
} from "../../../data/BackgroundPalettes";

const GeneralSettings: React.FC = () => {
    const {
        hour24,
        hideSearchTip,
        desktopIconTextBackground,
        audio,
        background,
        backgroundColorDepth,
        pixelateBackground,
        backgroundPixelSize,
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
                description="Choose and customize a desktop background image."
            >
                <div className="flex flex-col gap-3">
                    <div
                        role="img"
                        aria-label={
                            background
                                ? "Custom background preview"
                                : "Default background preview"
                        }
                        className="isolate relative h-28 w-full max-w-sm overflow-hidden border-2 border-nso-purple"
                    >
                        <BackgroundImage
                            src={background ?? defaultBackground}
                            colorDepth={backgroundColorDepth}
                            pixelSize={
                                pixelateBackground ? backgroundPixelSize : 1
                            }
                        />
                    </div>
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
                    <div className="flex max-w-sm flex-col gap-1">
                        <label htmlFor="backgroundColorDepth" className="text-xl">
                            Background color depth
                        </label>
                        <select
                            id="backgroundColorDepth"
                            value={backgroundColorDepth}
                            onChange={(event) => {
                                void changeSettings(
                                    "backgroundColorDepth",
                                    event.target.value as BackgroundColorDepth,
                                );
                            }}
                            className="border-2 text-xl border-b-white border-r-white border-t-nso-purple border-l-nso-purple bg-nso-light-pink p-2 w-full min-w-0"
                        >
                            <option value="default">Default</option>
                            <option value="4-bit">4-bit color (16 colors)</option>
                            <option value="8-bit">8-bit color (256 colors)</option>
                        </select>
                        {backgroundColorDepth === "default" ? (
                            <p className="text-sm">
                                Original image colors vary by image.
                            </p>
                        ) : (
                            <div
                                role="img"
                                aria-label={`${backgroundColorDepth === "4-bit" ? "16-color" : "256-color"} palette`}
                                className="grid w-full max-w-sm gap-1 border-2 border-nso-purple bg-nso-white p-2"
                                style={{
                                    gridTemplateColumns: `repeat(${backgroundColorDepth === "4-bit" ? 8 : 16}, minmax(0, 1fr))`,
                                }}
                            >
                                {(backgroundColorDepth === "4-bit"
                                    ? fourBitPalette
                                    : eightBitPalette
                                ).map(([red, green, blue], index) => (
                                    <span
                                        key={`${red}-${green}-${blue}-${index}`}
                                        aria-hidden="true"
                                        title={`#${[red, green, blue]
                                            .map((channel) =>
                                                channel
                                                    .toString(16)
                                                    .padStart(2, "0"),
                                            )
                                            .join("")}`}
                                        className="aspect-square min-w-0 border border-black/20"
                                        style={{
                                            backgroundColor: `rgb(${red} ${green} ${blue})`,
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    <Checkbox
                        id="pixelateBackground"
                        label="Pixelate background"
                        state={pixelateBackground}
                        onClick={() => {
                            void changeSettings(
                                "pixelateBackground",
                                !pixelateBackground,
                            );
                        }}
                    />
                    <div className="flex max-w-sm flex-col gap-1">
                        <label
                            htmlFor="backgroundPixelSize"
                            className="text-xl"
                        >
                            Pixelation strength: {backgroundPixelSize} px
                        </label>
                        <input
                            id="backgroundPixelSize"
                            type="range"
                            min="2"
                            max="32"
                            step="1"
                            value={backgroundPixelSize}
                            disabled={!pixelateBackground}
                            onChange={(event) => {
                                void changeSettings(
                                    "backgroundPixelSize",
                                    Number(event.target.value),
                                );
                            }}
                            className="nso-range w-full disabled:opacity-50"
                        />
                    </div>
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
                    <Checkbox
                        id="desktopIconTextBackground"
                        label="Highlight desktop icon text"
                        state={desktopIconTextBackground}
                        onClick={() => {
                            changeSettings(
                                "desktopIconTextBackground",
                                !desktopIconTextBackground,
                            );
                        }}
                    />
                </div>
            </SettingsGroupSection>
        </SettingsGroup>
    );
};

export default GeneralSettings;
