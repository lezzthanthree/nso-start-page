import localforage from "localforage";
import React, { useEffect, useState } from "react";
import Button from "../Button";

interface NotepadNoticeProps {
    message?: string;
}

const NotepadNotice: React.FC<NotepadNoticeProps> = () => {
    const [showNotice, setShowNotice] = useState<boolean>(false);

    useEffect(() => {
        localforage.getItem<boolean>("notepadNotice").then((hasSeen) => {
            if (!hasSeen) {
                setShowNotice(true);
            }
        });
    }, []);

    if (!showNotice) return;

    return (
        <div className="absolute bg-[#eeeeeedd] flex flex-col justify-center items-center align-middle     text-xl w-full h-full p-4 gap-8">
            <div className="flex flex-col items-center gap-2">
                <i className="hn hn-exclamation-triangle-solid text-4xl " />
                <div>
                    <p className="text-center">
                        Your notes are only stored locally.
                    </p>
                    <p className="text-center">
                        However, clearing browser cache will erase all data.
                    </p>
                    <p className="text-center">
                        So, please avoid storing sensitive information～
                    </p>
                </div>
            </div>
            <Button
                label="Understood"
                onClick={async () => {
                    await localforage.setItem("notepadNotice", true);
                    setShowNotice(false);
                }}
            />
        </div>
    );
};

export default NotepadNotice;
