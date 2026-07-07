import { useEffect } from "react";
import { useExperimentalState } from "../hooks/useExperimental";

const ErrorFallback = ({ error }: { error: Error }) => {
    const { experimental } = useExperimentalState();

    useEffect(() => {
        // To avoid repetitive noise when doing something
        if (!experimental) new Audio("snd/bluescreen.wav").play();
        else new Audio("snd/bluescreen-short.wav").play();
    }, []);

    return (
        <div className="w-screen h-screen bg-[#0001fc] flex flex-col relative overflow-hidden px-32 py-32 text-nso-white gap-8">
            <div className="flex flex-col gap-2">
                <p className="font-nso-pressstart-2p text-4xl">
                    AN ERROR HAS OCCURRED
                </p>
                <p className="font-nso-zpix text-4xl">{error.name}</p>
            </div>
            <div>
                <p className="font-nso-zpix text-lg">
                    Message: {error.message}
                </p>
                <p className="font-nso-zpix text-lg">Traceback: </p>
                <p className="font-nso-zpix text-lg pl-8 h-48 truncate whitespace-pre">
                    {error.stack}
                </p>
            </div>
            <div>
                {experimental ? (
                    <p className="font-nso-zpix text-lg">
                        {DevMessage(error.name)}
                    </p>
                ) : (
                    <>
                        <p className="font-nso-zpix text-lg">
                            We're sorry for your inconvenience.{" "}
                        </p>
                        <p className="font-nso-zpix text-lg">
                            If the problem persists, please report this on
                            GitHub.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default ErrorFallback;

const DevMessage = (errorName: string) => {
    switch (errorName) {
        case "ReferenceError":
            return "Did you forget a variable? You might misspelt KAngel with KAngle.";
        case "TypeError":
            return "Ame class is not a KAngel class, got it?";
        case "SyntaxError":
            return "You might left a semi-colon behind.";
        case "RangeError":
            return "Bro thought you could use [-1] as index.";
        case "InternetOverdose":
            return "You probably thought there's an easter egg here, but no. There's none.";
        default:
            return "This could be something else. Debug a little more.";
    }
};
