import React from 'react';
import {useTranslation} from "react-i18next";

type Language = 'en' | 'ua';

const LanguageToggle = () => {

    const {t, i18n} = useTranslation();

    const changeLanguage = (language: Language) => {
        i18n.changeLanguage(language)
        .catch((error) => {console.error('Не вдалося змінити мову:', error)});
    };

    return (
        <>
            <h1>{t('welcome')}</h1>
            <button onClick={() => changeLanguage('en')}>English</button>
            <button onClick={() => changeLanguage('ua')}>Українська</button>
        </>
    );
};

export default LanguageToggle;
