import React from "react";
import { useStartState } from "../../hooks/useStart";

interface StartMenuOptionProps {
    name: string;
    action?: () => void;
    disabled?: boolean;
}

const StartMenuOption: React.FC<StartMenuOptionProps> = ({
    name,
    action,
    disabled = false,
}) => {
    const { setActive } = useStartState();

    const handleAction = () => {
        if (disabled) return;
        setActive(false);
        if (action) action();
    };

    return (
        <div
            className={`flex flex-row gap-2 items-center justify-center border-2 border-t-white bg-nso-white p-1 text-lg border-l-white border-b-nso-purple border-r-nso-purple ${disabled ? "text-nso-purple/50" : "hover:border-b-black hover:border-r-black hover:bg-nso-purple hover:text-nso-white"} w-48`}
            onClick={handleAction}
        >
            {name}
        </div>
    );
};

export default StartMenuOption;
