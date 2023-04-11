// components/Resize/Resize.tsx
import React, { FC, useEffect, useRef, useState } from 'react';

interface ResizeProps {
    sectionRef: React.RefObject<HTMLDivElement>;
    minWidthPane2: number;
}

const Resize: FC<ResizeProps> = ({ sectionRef, minWidthPane2 }) => {
    const [currentPaneWidth, setCurrentPaneWidth] = useState(0);

    const dragIndicatorRef = useRef(false);

    const minWidthPane1 = 100;
    const maxWidthPane1 = window.innerWidth - minWidthPane2;

    useEffect(() => {
        const newWidth = window.innerWidth * 0.2;
        setCurrentPaneWidth(newWidth);
    }, []);

    useEffect(() => {
        document.addEventListener('mousemove', resizeWidth);
        document.addEventListener('mouseup', stopResize);
        return () => {
            document.removeEventListener('mousemove', resizeWidth);
            document.removeEventListener('mouseup', stopResize);
        };
    }, []);

    const startResize = (evt: React.MouseEvent) => {
        if (evt.button !== 0) return;
        dragIndicatorRef.current = true;
    };

    const stopResize = () => {
        dragIndicatorRef.current = false;
    };

    const resizeWidth = (evt: MouseEvent) => {
        if (dragIndicatorRef.current) {
            evt.stopPropagation();
            evt.preventDefault();
            const newWidth = Math.min(Math.max(minWidthPane1, evt.clientX), maxWidthPane1);
            setCurrentPaneWidth(newWidth);
        }
    };

    useEffect(() => {
        if (sectionRef.current) {
            sectionRef.current.style.width = `${currentPaneWidth}px`;
        }
    }, [currentPaneWidth, sectionRef]);

    return (
        <div className="resize resize-vertical" onMouseDown={startResize}>
            <div>...</div>
        </div>
    );
};

export default Resize;
