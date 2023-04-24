import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {setFilePath} from "../../store/fileSlice";
import {Item} from "../../types";
import FolderButton from "../FolderButton/FolderButton";
import {FileListItems} from "./FileListItems";


export const FileList = () => {
    const dispatch = useDispatch();
    const [items, setItems] = useState<Item[]>([]);

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
            />
        </div>
    );
};

