import React, {FC, useCallback, useState} from 'react';
import {setFilePath} from "../../store/fileSlice";
import {useDispatch} from "react-redux";

type FolderButtonType = {
    filePath: any
    items: any
    generateFolderName: any
    setItems: any
}

const FolderButton: FC<FolderButtonType> = ({filePath, items, generateFolderName, setItems}) => {
    const [folderName, setFolderName] = useState("");
    const dispatch = useDispatch();

    const openFolderDialog = async () => {
        const directoryPath = await window.electron.invoke("open-folder-dialog");
        if (directoryPath) {
            dispatch(setFilePath(directoryPath));
        }
    };

    const createFolder = useCallback(async () => {
        if (!filePath) return;
        const newFolderName = folderName.trim() || generateFolderName("New Folder");
        const newFolderPath = await window.electron.invoke("create-folder", filePath, newFolderName);

        setItems((prevItems: any) => [
            ...prevItems,
            {name: newFolderName, path: newFolderPath, isDirectory: true},
        ]);

        setFolderName("");
    }, [filePath, folderName, items]);

    return (
        <>
            <button onClick={openFolderDialog}>Вибрати папку</button>
            <input
                type="text"
                placeholder="Назва папки"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
            />
            <button onClick={createFolder}>Створити нову папку</button>
        </>
    );
};

export default FolderButton;

