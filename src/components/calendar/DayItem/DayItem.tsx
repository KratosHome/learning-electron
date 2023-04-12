// src/components/calendar/Day.tsx
import React, { FC } from 'react';

interface DayItemType {
    day: Date;
    isToday: boolean;
    handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    handleDrop: (e: React.DragEvent<HTMLDivElement>, date: Date) => void;
    children: React.ReactNode;
}

export const DayItem: FC<DayItemType> = ({ day, isToday, handleDragOver, handleDrop, children }) => (
    <div
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, day)}
        style={{
            backgroundColor: isToday ? 'yellow' : '',
        }}
    >
        {day.getDate()}
        {children}
    </div>
);

