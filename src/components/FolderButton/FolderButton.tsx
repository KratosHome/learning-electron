import React, {FC, useCallback, useState} from 'react';
import {setFilePath} from "../../store/fileSlice";
import {useDispatch} from "react-redux";
import MayInput from "../UI/MayInput/MayInput";
import {useTranslation} from "react-i18next";

type FolderButtonType = {
    filePath: any
    items: any
    setItems: any
}

const FolderButton: FC<FolderButtonType> = ({filePath, items, setItems}) => {
    const [folderName, setFolderName] = useState("");
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const openFolderDialog = async () => {
        const directoryPath = await window.electron.invoke("open-folder-dialog");
        if (directoryPath) {
            dispatch(setFilePath(directoryPath));
        }

    };
    const generateFolderName = (baseName: string) => {
        let name = baseName;
        let count = 1;
        while (items.find((item: any) => item.name === name)) {
            name = `${baseName} (${count})`;
            count++;
        }
        return name;
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
            <MayInput
                translate={`${t('new_folder')}`}
                value={folderName}
                onChange={(e: any) => setFolderName(e.target.value)}
            />
            <button onClick={createFolder}>Створити нову папку</button>
        </>
    );
};

export default FolderButton;

