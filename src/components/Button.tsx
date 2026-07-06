import React from "react";

interface ButtonProps {
    label: string;
    icon?: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, icon, onClick }) => {
    return (
        <button
            className="flex flex-row gap-2 items-center border-2 border-t-white border-l-white border-b-nso-purple border-r-nso-purple active:border-b-white active:border-r-white active:border-t-nso-purple active:border-l-nso-purple hover:border-b-nso-gray hover:border-r-nso-gray hover:border-t-nso-purple hover:border-l-nso-purple     p-2 text-xl bg-nso-white"
            onClick={onClick}
        >
            {icon && <i className={`hn ${icon}`} />}
            {label}
        </button>
    );
};

export default Button;
