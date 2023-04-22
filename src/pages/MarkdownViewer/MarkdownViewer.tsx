import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
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

    return <ReactMarkdown>{content}</ReactMarkdown>;
};

export default MarkdownViewer;
