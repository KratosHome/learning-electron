import React from 'react';
import {useTranslation} from "react-i18next";

type Language = 'en' | 'ua';

const LanguageToggle = () => {

    const { i18n} = useTranslation();

    const changeLanguage = (language: Language) => {
        i18n.changeLanguage(language)
            .catch((error) => {
                console.error('Не вдалося змінити мову:', error)
            });
    };
    return (
        <>
            {i18n.language === "en" ?
                <button onClick={() => changeLanguage('ua')}>ua</button> :
                <button onClick={() => changeLanguage('en')}>en</button>}
        </>
    );
};

export default LanguageToggle;
