import React from "react";

interface InputBoxProps {
    placeholder?: string;
    value: string | number;
    onChange: (newValue: string | number) => void;
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
            {label && <p className="  text-xl">{label}</p>}
            <input
                type={type ?? "text"}
                className="flex-1 flex flex-row gap-2 items-center border-2 text-xl border-b-white border-r-white border-t-nso-purple border-l-nso-purple bg-nso-light-pink     p-2 w-full min-w-0"
                value={value}
                placeholder={placeholder}
                onChange={(e) => {
                    const value = e.target.value;
                    onChange(value);
                }}
                ref={ref}
            />
            {footer && <p className="  text-sm">{footer}</p>}
        </div>
    );
};

export default InputBox;
