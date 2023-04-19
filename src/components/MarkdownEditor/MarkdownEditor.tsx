import React, {useEffect, useState} from "react";
import "./MarkdownEditor.scss";
import {EditorState, convertToRaw, ContentState} from "draft-js";
import {Editor} from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import {FileList} from "../FileList/FileList";

export const MarkdownEditor = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [filePath, setFilePath] = useState(null);

    const onEditorStateChange = (newEditorState: any) => {
        setEditorState(newEditorState);
    };

/*
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            const message = event.data;
            switch (message.type) {
                case "create-file":
                    setFilePath(message.filePath);
                    setEditorState(EditorState.createEmpty());
                    break;
                case "open-file":
                    setFilePath(message.filePath);
                    const contentBlock = htmlToDraft(message.content);
                    if (contentBlock) {
                        const contentState = ContentState.createFromBlockArray(
                            contentBlock.contentBlocks
                        );
                        const newEditorState = EditorState.createWithContent(contentState);
                        setEditorState(newEditorState);
                    }
                    break;
                case "save-file":
                    if (filePath) {
                        const content = draftToHtml(
                            convertToRaw(editorState.getCurrentContent())
                        );
                        window.electron.invoke("save-file", content, filePath);
                    } else {
                        // Щось пішло не так, можна показати повідомлення про помилку
                    }
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("message", handleMessage);

        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, [editorState, filePath]);

        const getFiles = async () => {
        const filesList = await window.electron.invoke("get-files");
        setFiles(filesList);
    };

    useEffect(() => {
        getFiles();
    }, []);
 */

    const [files, setFiles] = useState([]);


    const createFile = async () => {
        const newFilePath = await window.electron.invoke("create-file");
        setFilePath(newFilePath);
        setEditorState(EditorState.createEmpty());
    };
    return (
        <div>
            <button onClick={createFile}>Створити файл</button>
            <FileList files={files}/>
            <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={onEditorStateChange}
            />
        </div>
    );
};
