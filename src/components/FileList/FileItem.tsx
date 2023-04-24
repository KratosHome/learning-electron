import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Item } from "../../types";
import { FileListItems } from './FileListItems';

interface FileItemProps {
    item: any;
    level: number;
    expandedFolders?: Set<string>;
}

export const FileItem: React.FC<FileItemProps> = ({ item, level, expandedFolders }) => {
    const [localExpandedFolders, setLocalExpandedFolders] = useState<Set<string>>(expandedFolders || new Set<string>());

    const onItemClick = (item: Item) => {
        if (item.isDirectory) {
            const newLocalExpandedFolders = new Set(localExpandedFolders);
            if (newLocalExpandedFolders.has(item.path)) {
                newLocalExpandedFolders.delete(item.path);
            } else {
                newLocalExpandedFolders.add(item.path);
            }
            setLocalExpandedFolders(newLocalExpandedFolders);
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

    const fileType = getFileType(item.name);

    return (
        <ul>
            <li key={item.path} style={{ paddingLeft: level * 20 }}>
                <div onClick={() => onItemClick(item)}>
                    {fileType === 'image' ? (
                        <Link to={`/image/${encodeURIComponent(item.path)}`}>{item.name}</Link>
                    ) : fileType === 'markdown' ? (
                        <Link to={`/markdown/${encodeURIComponent(item.path)}`}>{item.name}</Link>
                    ) : (
                        item.name
                    )}
                </div>
                {item.isDirectory && localExpandedFolders.has(item.path) && (
                    <FileListItems
                        items={item.children || []}
                        level={level + 1}
                        expandedFolders={localExpandedFolders}
                    />
                )}
            </li>
        </ul>
    );
};
