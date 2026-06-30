import React from "react";

interface Icon8BitProps {
    icon: string;
    color?: string;
    name: string;
    action: () => void;
    execute?: boolean;
}

const Icon8Bit: React.FC<Icon8BitProps> = ({
    icon,
    color = "text-nso-purple",
    name,
    action,
    execute = false,
}) => {
    const handleAction = () => {
        if (execute) {
            new Audio("snd/execute.wav").play().catch((e) => console.log(e));
        }
        action();
    };

    return (
        <div
            className="flex flex-col items-center gap-2 font-nso-dinkie-7px text-nso-purple text-base/4 w-20 text-center"
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
