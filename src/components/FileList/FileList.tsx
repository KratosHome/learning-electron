import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {setFilePath} from "../../store/fileSlice";
import {Item} from "../../types";
import FolderButton from "../FolderButton/FolderButton";
import {FileListItems} from "./FileListItems";
import {useNavigate} from "react-router";


export const FileList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [items, setItems] = useState<Item[]>([]);
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
    const [selectedFileContent, setSelectedFileContent] = useState<string | null>(null);
    const [selectedFileType, setSelectedFileType] = useState<string | null>(null);

    const filePath = useSelector((state: RootState) => state.files.files.patch);

    useEffect(() => {
        if (!filePath) return;
        const fetchItems = async (dirPath: string): Promise<Item[]> => {
            const filesAndFolders = await window.electron.invoke("get-files-and-folders", dirPath);
            // для отримання списку файлів та папок у вказаній директорі
            const filteredFilesAndFolders = filesAndFolders.filter((item: Item) => item.name !== ".DS_Store");
            // видалити елементи з назвою ".DS_Store"
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

        fetchItems(filePath).then(setItems);
    }, [filePath]);


    useEffect(() => {
        // шлях до папки з файлами
        const fetchFilePath = async () => {
            const savedFilePath = await window.storeAPI.getValue("files");
            if (savedFilePath) {
                dispatch(setFilePath(savedFilePath));
            }
        };

        fetchFilePath();
    }, [dispatch]);


    const toggleFolder = (folderPath: string) => {
        const newExpandedFolders = new Set(expandedFolders);
        // шлаях до папки
        if (newExpandedFolders.has(folderPath)) {
            newExpandedFolders.delete(folderPath);
            // папка зачинена
        } else {
            newExpandedFolders.add(folderPath);
            // папка відчинена
        }
        setExpandedFolders(newExpandedFolders);
    };


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
                return <img src={`data:image/png;base64,${selectedFileContent}`} alt="Selected"/>;
            case "markdown":
                return <pre>{selectedFileContent}</pre>;
            default:
                return null;
        }
    };


    return (
        <div>
            <FolderButton
                filePath={filePath}
                items={items}
                setItems={setItems}
            />
            <FileListItems
                items={items}
                level={0}
                toggleFolder={toggleFolder}
                expandedFolders={expandedFolders}
                openFile={openFile}
            />
            {renderFileContent()}
        </div>
    );
};

