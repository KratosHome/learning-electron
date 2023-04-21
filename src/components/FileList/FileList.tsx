import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {setFilePath} from "../../store/fileSlice"

interface Item {
    name: string;
    path: string;
    isDirectory: boolean;
    children?: Item[];
}

export const FileList = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [folderName, setFolderName] = useState('');
    const [previousFolderPaths, setPreviousFolderPaths] = useState<(string | null)[]>([]);
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());


    const filePath = useSelector((state: RootState) => state.files.files.patch);
    const dispatch = useDispatch();


    async function fetchItems(dirPath: string): Promise<Item[]> {
        const filesAndFolders = await window.electron.invoke('get-files-and-folders', dirPath);
        const items = await Promise.all(
            filesAndFolders.map(async (item: Item) => {
                if (item.isDirectory) {
                    item.children = await fetchItems(item.path);
                }
                return item;
            })
        );
        return items;
    }
    useEffect(() => {
        // збереження стору на компі
        const fetchFilePath = async () => {
            const savedFilePath = await window.storeAPI.getValue("files");
            if (savedFilePath) {
                dispatch(setFilePath(savedFilePath));
            }
        };

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

    const createFolder = useCallback(async () => {
        if (!filePath) return;

        const newFolderName = folderName.trim() || generateFolderName('New Folder');
        const newFolderPath = await window.electron.invoke('create-folder', filePath, newFolderName);
        setItems((prevItems) => [
            ...prevItems,
            {name: newFolderName, path: newFolderPath, isDirectory: true},
        ]);
        setFolderName('');
    }, [filePath, folderName, items]);

    const openFolderDialog = async () => {
        const directoryPath = await window.electron.invoke('open-folder-dialog');
        if (directoryPath) {
            dispatch(setFilePath(directoryPath));
        }
    };

    const openFolder = (folderPath: string) => {
        setPreviousFolderPaths([...previousFolderPaths, filePath]);
        dispatch(setFilePath(folderPath));
    };

    const goBack = () => {
        if (previousFolderPaths.length > 0) {
            dispatch(setFilePath(previousFolderPaths.pop() || null));
            setPreviousFolderPaths([...previousFolderPaths]);
        }
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

    const renderItems = (items: Item[], level = 0) => {
        return items.map((item) => (
            <div key={item.path}>
                <div
                    style={{paddingLeft: `${level * 16}px`}}
                    onClick={() => {
                        if (item.isDirectory) {
                            toggleFolder(item.path);
                        }
                    }}
                >
                    {item.name}
                </div>
                {item.isDirectory && expandedFolders.has(item.path) && item.children && renderItems(item.children, level + 1)}
            </div>
        ));
    };


    return (
        <div>
            <button onClick={openFolderDialog}>Вибрати папку</button>
            <button onClick={goBack}>Назад</button>
            <input
                type="text"
                placeholder="Назва папки"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
            />
            <button onClick={createFolder}>Створити нову папку</button>
            {renderItems(items)}
        </div>
    );
};
