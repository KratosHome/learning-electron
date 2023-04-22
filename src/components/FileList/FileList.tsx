import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {setFilePath} from "../../store/fileSlice";
import { Item } from "../../types";
import FolderButton from "../FolderButton/FolderButton";
import { FileListItems } from "./FileListItems";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router";


export const FileList = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

    const filePath = useSelector((state: RootState) => state.files.files.patch);
    const dispatch = useDispatch();

    const fetchItems = async (dirPath: string): Promise<Item[]> => {
        const filesAndFolders = await window.electron.invoke("get-files-and-folders", dirPath);
        const filteredFilesAndFolders = filesAndFolders.filter((item: Item) => item.name !== ".DS_Store");

        const items = await Promise.all(
            filteredFilesAndFolders.map(async (item: Item) => {
                if (item.isDirectory) {
                    item.children = await fetchItems(item.path);
                }
                return item;
            })
        );

        return items;
    };

    const fetchFilePath = async () => {
        const savedFilePath = await window.storeAPI.getValue("files");
        if (savedFilePath) {
            dispatch(setFilePath(savedFilePath));
        }
    };

    useEffect(() => {
        fetchFilePath();
    }, [dispatch]);

    useEffect(() => {
        if (!filePath) return;
        fetchItems(filePath).then(setItems);
    }, [filePath]);

    const generateFolderName = (baseName: string) => {
        let name = baseName;
        let count = 1;
        while (items.find((item) => item.name === name)) {
            name = `${baseName} (${count})`;
            count++;
        }
        return name;
    };


    const toggleFolder = (folderPath: string) => {
        const newExpandedFolders = new Set(expandedFolders);
        if (newExpandedFolders.has(folderPath)) {
            newExpandedFolders.delete(folderPath);
        } else {
            newExpandedFolders.add(folderPath);
        }
        setExpandedFolders(newExpandedFolders);
    };




    const [selectedFileContent, setSelectedFileContent] = useState<string | null>(null);
    const [selectedFileType, setSelectedFileType] = useState<string | null>(null);

    // ... rest of your code

    // Add a new function to open and read the file content
    const navigate = useNavigate();

    const openFile = (filePath: string, fileType: string) => {
        switch (fileType) {
            case 'image':
                navigate(`/image/${encodeURIComponent(filePath)}`);
                break;
            case 'markdown':
                navigate(`/markdown/${encodeURIComponent(filePath)}`);
                break;
            default:
                break;
        }
    };

    // Render the appropriate file content based on the file type
    const renderFileContent = () => {
        if (!selectedFileContent || !selectedFileType) return null;

        switch (selectedFileType) {
            case "image":
                return <img src={`data:image/png;base64,${selectedFileContent}`} alt="Selected" />;
            case "markdown":
                return <pre>{selectedFileContent}</pre>;
            default:
                return null;
        }
    };


    return (
        <div>
            <FolderButton filePath={filePath} items={items} generateFolderName={generateFolderName} setItems={setItems} />
            <FileListItems items={items} level={0} toggleFolder={toggleFolder} expandedFolders={expandedFolders} openFile={openFile} />
            {renderFileContent()}
        </div>
    );
};

