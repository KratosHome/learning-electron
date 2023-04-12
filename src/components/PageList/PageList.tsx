import React from 'react';
import { Link } from 'react-router-dom';
import {useTranslation} from "react-i18next";

const PageList = () => {
    const {t} = useTranslation();
    return (
        <>
            <ul>
                <li>
                    <Link to="/">inbox</Link>
                </li>
                <li>
                    <Link to="/Calendar">{t('calendar')}</Link>
                </li>
                <li>
                    <Link to="/today">{t('today')}</Link>
                </li>
                <li>
                    <Link to="/todo">{t('todo')}</Link>
                </li>
                <li>
                    <Link to="/upcoming">{t('upcoming')}</Link>
                </li>
            </ul>
        </>
    );
};

export default PageList;
