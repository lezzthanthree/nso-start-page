import React from "react";
import { useExperimentalState } from "../../hooks/useExperimental";
import { useAudioManager } from "../../hooks/useAudioManager";

interface Icon8BitProps {
    icon: string;
    color?: string;
    name: string;
    action: () => void;
    execute?: boolean;
    from?: string;
}

const Icon8Bit: React.FC<Icon8BitProps> = ({
    icon,
    color = " ",
    name,
    action,
    execute = false,
    from,
}) => {
    const { experimental } = useExperimentalState();
    const { playSound } = useAudioManager();

    const handleAction = () => {
        if (execute) {
            playSound("snd/execute.wav");
        }

        if (experimental && from == "speed-dial") {
            console.info("Will not redirect. Development mode on.");
            return;
        }

        action();
    };

    return (
        <div
            className="flex flex-col items-center gap-2 cursor-pointer text-lg/4 w-20 text-center"
            onClick={handleAction}
        >
            <i
                className={`hn ${icon} h-16 w-16 text-[64px]`}
                style={{
                    color,
                }}
            />
            <p>{name}</p>
        </div>
    );
};

export default Icon8Bit;
