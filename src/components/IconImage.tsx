import React from "react";

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
    const handleAction = () => {
        if (execute) {
            new Audio("snd/execute.wav").play().catch((e) => console.log(e));
        }
        action();
    };

    return (
        <div
            className="flex flex-col items-center gap-2     text-lg/4 w-20 text-center"
            onClick={handleAction}
        >
            <img src={image} alt="" className="h-16 w-16 object-cover icon" />
            <p>{name}</p>
        </div>
    );
};

export default IconImage;
