import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type MarkdownViewerParams = {
    file: string;
};

const MarkdownViewer: React.FC = () => {
    const { file } = useParams<Record<keyof MarkdownViewerParams, string>>();
    const [content, setContent] = useState<string>("");

    useEffect(() => {
        const fetchContent = async () => {
            const fileContent = await window.electron.invoke("read-file", file);
            setContent(fileContent);
        };

        fetchContent();
    }, [file]);

    const handleContentChange = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newContent = event.target.value;
        setContent(newContent);

        // Зберегти зміни в файлі
        await window.electron.invoke("write-file", file, newContent);
    };

    return (
        <div>
            <textarea value={content} onChange={handleContentChange} />
        </div>
    );
};

export default MarkdownViewer;
