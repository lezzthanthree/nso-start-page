import React from "react";
import { Window } from "../Window";

const Developer: React.FC = () => {
    return (
        <Window title="Developer Mode" id="developer" x={50} y={50}>
            <div className="w-4xl flex flex-col gap-4    p-4 overflow-y-scroll">
                <div id="header">
                    <p className="font-nso-pressstart-2p text-4xl">
                        Developer Mode
                    </p>
                </div>
                <div>
                    <p className="font-normal  ">
                        Some features are enabled or disabled in developer mode.
                    </p>
                    <ul className="font-normal   list-disc pl-4">
                        <li>
                            Speed Dial links will not redirect to reduce refresh
                            times.
                        </li>
                    </ul>
                </div>
            </div>
        </Window>
    );
};

export default Developer;
