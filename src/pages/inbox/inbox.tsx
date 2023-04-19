import React, {useEffect, useCallback, useState} from 'react';

interface Item {
    name: string;
    path: string;
    isDirectory: boolean;
}

const Inbox = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [currentFolderPath, setCurrentFolderPath] = useState<string | null>(null);

    useEffect(() => {
        if (!currentFolderPath) return;

        async function fetchItems() {
            const items = await window.electron.invoke("get-files-and-folders", currentFolderPath);
            setItems(items);
        }

        fetchItems();
    }, [currentFolderPath]);

    const createFolder = useCallback(async () => {
        if (!currentFolderPath) return;

        const folderName = "New Folder";
        const newFolderPath = await window.electron.invoke("create-folder", currentFolderPath, folderName);
        setItems((prevItems) => [
            ...prevItems,
            { name: folderName, path: newFolderPath, isDirectory: true },
        ]);
    }, [currentFolderPath]);

    const openFolderDialog = async () => {
        const directoryPath = await window.electron.invoke("open-folder-dialog");
        if (directoryPath) {
            setCurrentFolderPath(directoryPath);
            console.log("Selected folder:", directoryPath);
        }
    };

    return (
        <div>
            <button onClick={openFolderDialog}>Вибрати папку</button>
            <button onClick={createFolder}>Створити нову папку</button>
            {items.map((item) => (
                <div key={item.path}>{item.name}</div>
            ))}
        </div>
    );
};

export default Inbox;
