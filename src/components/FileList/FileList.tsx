import React, { useEffect, useState } from "react";

interface FileListProps {
    files: string[];
}

export const FileList: React.FC<FileListProps> = ({ files }) => {
    return (
        <div>
            <h3>Список файлів</h3>
            <ul>
                {files.map((file, index) => (
                    <li key={index}>{file}</li>
                ))}
            </ul>
        </div>
    );
};
