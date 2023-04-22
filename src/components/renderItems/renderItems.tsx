import React, {FC, useState} from 'react';

type RenderItemsProps = {
    items: any
    level?: number;
    toggleFolder: (folderPath: string) => void;
    isSupportedFile: (filename: string) => boolean;
};

const RenderItems: FC<RenderItemsProps> = ({items, level = 0, toggleFolder, isSupportedFile}) => {
    const [selectedFile, setSelectedFile] = useState<string | null>(null);

    return (
        <div>

        </div>
    );
};

export default RenderItems;
