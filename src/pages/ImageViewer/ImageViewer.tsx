import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type ImageViewerParams = {
    file: string;
};

const ImageViewer: React.FC = () => {
    const { file } = useParams<Record<keyof ImageViewerParams, string>>();
    const [content, setContent] = useState<string>("");

    useEffect(() => {
        const fetchContent = async () => {
            const fileContent = await window.electron.invoke("read-file", file);
            setContent(fileContent);
        };

        fetchContent();
    }, [file]);

    return <img src={`data:image/png;base64,${content}`} alt="Selected" />;
};

export default ImageViewer;
