import {t} from 'i18next';
import React, {FC} from 'react';
import "./fontSelector.scss"

type FontSelectorType = {
    fontSize: number
    setFontSize: (value: number) => void;
}

const FontSelector: FC<FontSelectorType> = ({setFontSize, fontSize}) => {
    const handleInputChange = (event: any) => {
        setFontSize(event.target.value);
    };

    return (
        <div className="container-font-size">
            <label htmlFor="font-size-selector">{t('font-size')}</label>
            <input
                type="number"
                id="font-size-selector"
                value={fontSize}
                onChange={handleInputChange}
                min={10}
                max={25}
            />
        </div>
    );
};

export default FontSelector;
