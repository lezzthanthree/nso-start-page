import React from "react";
import { useAudioManager } from "../../hooks/useAudioManager";

interface IconImageProps {
    image: string;
    name: string;
    action: () => void;
    execute?: boolean;
}

const IconImage: React.FC<IconImageProps> = ({
    image,
    name,
    action,
    execute = false,
}) => {
    const { playSound } = useAudioManager();

    const handleAction = () => {
        if (execute) {
            playSound("snd/execute.wav");
        }
        action();
    };

    return (
        <div
            className="flex flex-col items-center gap-2 cursor-pointer text-lg/4 w-20 text-center"
            onClick={handleAction}
        >
            <img src={image} alt="" className="h-16 w-16 object-cover icon" />
            <p>{name}</p>
        </div>
    );
};

export default IconImage;
