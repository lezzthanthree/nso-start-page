import React from "react";

interface InputBoxProps {
    placeholder?: string;
    value: string;
    onChange: (newString: string) => void;
    ref?: React.RefObject<HTMLInputElement | null>;
    label?: string;
    footer?: string;
    type?: "text" | "number";
}

const InputBox: React.FC<InputBoxProps> = ({
    placeholder = "",
    value,
    onChange,
    ref,
    label,
    footer,
    type,
}) => {
    return (
        <div className="flex flex-col flex-1">
            {label && <p className="font-nso-dinkie-9px text-xl">{label}</p>}
            <input
                type={type ?? "text"}
                className="flex-1 flex flex-row gap-2 items-center border-2 text-xl border-b-white border-r-white border-t-nso-purple border-l-nso-purple bg-nso-light-pink font-nso-dinkie-9px text-nso-purple p-2 w-full min-w-0"
                value={value}
                placeholder={placeholder}
                onChange={(e) => {
                    const value = e.target.value;
                    onChange(value);
                }}
                ref={ref}
            />
            {footer && <p className="font-nso-dinkie-9px text-sm">{footer}</p>}
        </div>
    );
};

export default InputBox;
