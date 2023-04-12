import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';

type GoToToday = {
    setCurrentDate: (date: Date) => void;
}

export const GoToToday: FC<GoToToday> = ({setCurrentDate}) => {
    const {t} = useTranslation();
    const goToToday = () => {
        const today = new Date();
        setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
    };

    return (
        <>
            <button onClick={goToToday}>{t('today')}</button>
        </>
    );
};
