import React from 'react';
import { Item } from "../../types";
import { FileListItems } from './FileListItems';

interface FileItemProps {
    item:any
    level: number;
    toggleFolder: (folderPath: string) => void;
    expandedFolders: Set<string>;
    openFile?: (filePath: string, fileType: string) => void;
}

export const FileItem: React.FC<FileItemProps> = ({ item, level, toggleFolder, expandedFolders, openFile }) => {

    const onItemClick = (item: Item) => {
        if (item.isDirectory) {
            toggleFolder(item.path);
        } else {
            const fileType = getFileType(item.name);
            if (fileType && openFile) {
                openFile(item.path, fileType);
            }
        }
    };

    const getFileType = (fileName: string): string | null => {
        const fileExtension = fileName.split(".").pop()?.toLowerCase();
        switch (fileExtension) {
            case "png":
            case "jpg":
            case "jpeg":
            case "gif":
                return "image";
            case "md":
            case "markdown":
                return "markdown";
            default:
                return null;
        }
    };



    return (
        <ul>
            <li key={item.path} style={{ paddingLeft: level * 20 }}>
                <div onClick={() => onItemClick(item)}>
                    {item.name}
                </div>
                {item.isDirectory && expandedFolders.has(item.path) && (
                    <FileListItems
                        items={item.children || []}
                        level={level + 1}
                        toggleFolder={toggleFolder}
                        expandedFolders={expandedFolders}
                        openFile={openFile}
                    />
                )}
            </li>
        </ul>
    );
};
