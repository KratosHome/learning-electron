import React from "react";
import { Item } from "../../types";
import { FileItem } from "./FileItem";

interface FileListItemsProps {
    items: Item[];
    level: number;
    expandedFolders?: Set<string>;
}

export const FileListItems: React.FC<FileListItemsProps> = ({ items, level, expandedFolders }) => {
    const localExpandedFolders = expandedFolders || new Set();

    return (
        <>
            {items.map((item) => (
                <React.Fragment key={item.path}>
                    <FileItem item={item} level={level} expandedFolders={localExpandedFolders} />
                    {item.isDirectory && item.children && localExpandedFolders.has(item.path) && (
                        <FileListItems items={item.children} level={level + 1} expandedFolders={localExpandedFolders} />
                    )}
                </React.Fragment>
            ))}
        </>
    );
};
