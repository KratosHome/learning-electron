import React from "react";
import { Item } from "../../types";
import { FileItem } from "./FileItem";

interface FileListItemsProps {
    items: Item[];
    level: number;
    toggleFolder: (folderPath: string) => void;
    expandedFolders: Set<string>;
    openFile?: (filePath: string, fileType: string) => void;
}

export const FileListItems: React.FC<FileListItemsProps> = ({ items, level, toggleFolder, expandedFolders, openFile }) => {

    return (
        <>
            {items.map((item) => (
                <React.Fragment key={item.path}>
                    <FileItem item={item} level={level} toggleFolder={toggleFolder} expandedFolders={expandedFolders} openFile={openFile} />
                    {item.isDirectory && item.children && expandedFolders.has(item.path) && (
                        <FileListItems items={item.children} level={level + 1} toggleFolder={toggleFolder} expandedFolders={expandedFolders} openFile={openFile} />
                    )}
                </React.Fragment>
            ))}
        </>
    );
};
