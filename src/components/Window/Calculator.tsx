import React, { useEffect, useEffectEvent, useState } from "react";
import { Window } from "../UI/Window";

type Operator = "+" | "-" | "*" | "/";

const calculate = (left: number, right: number, operator: Operator) => {
    switch (operator) {
        case "+":
            return left + right;
        case "-":
            return left - right;
        case "*":
            return left * right;
        case "/":
            return left / right;
    }
};

const formatResult = (value: number) =>
    Number.isFinite(value) ? String(Number(value.toPrecision(10))) : "Error";

const CalculatorWindow: React.FC = () => {
    const [display, setDisplay] = useState("0");
    const [storedValue, setStoredValue] = useState<number | null>(null);
    const [operator, setOperator] = useState<Operator | null>(null);
    const [replaceDisplay, setReplaceDisplay] = useState(false);

    const clear = () => {
        setDisplay("0");
        setStoredValue(null);
        setOperator(null);
        setReplaceDisplay(false);
    };

    const enterDigit = (digit: string) => {
        setDisplay((current) => {
            if (replaceDisplay || current === "Error") return digit;
            if (current.replace("-", "").length >= 12) return current;
            return current === "0" ? digit : current + digit;
        });
        setReplaceDisplay(false);
    };

    const enterDecimal = () => {
        setDisplay((current) => {
            if (replaceDisplay || current === "Error") return "0.";
            return current.includes(".") ? current : `${current}.`;
        });
        setReplaceDisplay(false);
    };

    const chooseOperator = (nextOperator: Operator) => {
        const currentValue = Number(display);
        if (operator && storedValue !== null && !replaceDisplay) {
            const result = calculate(storedValue, currentValue, operator);
            setDisplay(formatResult(result));
            setStoredValue(result);
        } else {
            setStoredValue(currentValue);
        }
        setOperator(nextOperator);
        setReplaceDisplay(true);
    };

    const showResult = () => {
        if (operator === null || storedValue === null) return;
        setDisplay(
            formatResult(calculate(storedValue, Number(display), operator)),
        );
        setStoredValue(null);
        setOperator(null);
        setReplaceDisplay(true);
    };

    const press = (key: string) => {
        if (/^\d$/.test(key)) {
            enterDigit(key);
        } else if (key === ".") {
            enterDecimal();
        } else if (["+", "-", "*", "/"].includes(key)) {
            chooseOperator(key as Operator);
        } else if (key === "Enter" || key === "=") {
            showResult();
        } else if (key === "Escape") {
            clear();
        } else if (key === "Backspace") {
            setDisplay((current) =>
                current.length > 1 ? current.slice(0, -1) : "0",
            );
            setReplaceDisplay(false);
        } else if (key === "%") {
            setDisplay(formatResult(Number(display) / 100));
            setReplaceDisplay(true);
        } else if (key === "sign") {
            setDisplay((current) => String(Number(current) * -1));
        } else if (key === "clear") {
            clear();
        }
    };

    const onKeyDown = useEffectEvent((event: KeyboardEvent) => {
        if (
            event.target instanceof HTMLElement &&
            (event.target.isContentEditable ||
                ["INPUT", "TEXTAREA"].includes(event.target.tagName))
        ) {
            return;
        }
        const key = event.key === " " ? "" : event.key;
        if (
            /^\d$/.test(key) ||
            [
                ".",
                "+",
                "-",
                "*",
                "/",
                "Enter",
                "=",
                "Escape",
                "Backspace",
                "%",
            ].includes(key)
        ) {
            event.preventDefault();
            press(key);
        }
    });

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, []);

    const keys = [
        { label: "AC", action: "clear", tone: "bg-nso-dark-pink" },
        { label: "+/-", action: "sign", tone: "bg-nso-light-pink" },
        { label: "%", action: "%", tone: "bg-nso-light-pink" },
        { label: "/", action: "/", tone: "bg-nso-cyan" },
        { label: "7", action: "7" },
        { label: "8", action: "8" },
        { label: "9", action: "9" },
        { label: "*", action: "*", tone: "bg-nso-cyan" },
        { label: "4", action: "4" },
        { label: "5", action: "5" },
        { label: "6", action: "6" },
        { label: "-", action: "-", tone: "bg-nso-cyan" },
        { label: "1", action: "1" },
        { label: "2", action: "2" },
        { label: "3", action: "3" },
        { label: "+", action: "+", tone: "bg-nso-cyan" },
        { label: "0", action: "0", span: true },
        { label: ".", action: "." },
        { label: "=", action: "=", tone: "bg-nso-cyan" },
    ];

    return (
        <Window title="Calculator" id="calculator">
            <div className="w-72 p-3 flex flex-col gap-3 bg-nso-light-pink">
                <div className="border-2 border-nso-purple bg-nso-white p-3 text-right overflow-hidden">
                    <p className="text-xs text-nso-purple/70 h-4">
                        {storedValue !== null && operator
                            ? `${storedValue} ${operator}`
                            : " "}
                    </p>
                    <output
                        aria-live="polite"
                        className="block text-3xl tabular-nums truncate"
                    >
                        {display}
                    </output>
                </div>
                <div className="grid grid-cols-4 gap-2">
                    {keys.map(
                        ({ label, action, tone = "bg-nso-white", span }) => (
                            <button
                                key={label}
                                type="button"
                                aria-label={
                                    label === "+/-" ? "Change sign" : label
                                }
                                onClick={() => press(action)}
                                className={`${span ? "col-span-2" : ""} ${tone} border-2 border-t-white border-l-white border-b-nso-purple border-r-nso-purple active:border-b-white active:border-r-white active:border-t-nso-purple active:border-l-nso-purple h-12 text-xl text-nso-purple`}
                            >
                                {label}
                            </button>
                        ),
                    )}
                </div>
            </div>
        </Window>
    );
};

export default CalculatorWindow;
