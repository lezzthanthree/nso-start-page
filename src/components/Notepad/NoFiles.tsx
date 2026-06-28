import React from "react";

const NoFiles: React.FC = () => {
    return (
        <div
            id="no-files"
            className="flex-1 flex flex-col justify-center items-center "
        >
            <i className="hn hn-info-circle-solid text-2xl" />
            <p>No notes found.</p>
            <p>Start by adding a new one!</p>
        </div>
    );
};

export default NoFiles;
