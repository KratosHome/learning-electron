import React, {FC} from 'react';

interface ChangeMonthProps {
    setCurrentDate: (newDate: Date) => void;
    currentDate: Date;
}

export const ChangeMonth: FC<ChangeMonthProps> = ({setCurrentDate, currentDate}) => {

    const changeMonth = (offset: number) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
    };

    return (
        <>
            <button onClick={() => changeMonth(-1)}> {'<'}</button>
            <button onClick={() => changeMonth(1)}>{'>'}</button>
        </>
    );
};
