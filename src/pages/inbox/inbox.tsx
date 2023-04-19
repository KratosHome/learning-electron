import React, {useEffect, useCallback, useState} from 'react';

interface Item {
    name: string;
    path: string;
    isDirectory: boolean;
}

const Inbox = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [currentFolderPath, setCurrentFolderPath] = useState<string | null>(null);
    const [folderName, setFolderName] = useState("");

    useEffect(() => {
        if (!currentFolderPath) return;

        async function fetchItems() {
            const items = await window.electron.invoke("get-files-and-folders", currentFolderPath);
            setItems(items);
        }

        fetchItems();
    }, [currentFolderPath]);

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
        if (!currentFolderPath) return;

        const newFolderName = folderName.trim() || generateFolderName("New Folder");
        const newFolderPath = await window.electron.invoke("create-folder", currentFolderPath, newFolderName);
        setItems((prevItems) => [
            ...prevItems,
            { name: newFolderName, path: newFolderPath, isDirectory: true },
        ]);
        setFolderName("");
    }, [currentFolderPath, folderName, items]);

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
            <input
                type="text"
                placeholder="Назва папки"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
            />
            <button onClick={createFolder}>Створити нову папку</button>
            {items.map((item) => (
                <div key={item.path}>{item.name}</div>
            ))}
        </div>
    );
};

export default Inbox;
