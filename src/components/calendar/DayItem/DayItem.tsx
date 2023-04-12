// src/components/calendar/Day.tsx
import React, { FC } from 'react';

type DayItemType ={
    day: any,
    isToday: any
    handleDragOver: any
    handleDrop: any
    children: any
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

