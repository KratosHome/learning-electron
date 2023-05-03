import React, { ChangeEvent, FC } from 'react';
import "./CustomCheckbox.scss"

type CustomCheckboxType = {
    id: string;
    label?: React.ReactNode;
    onCheckboxChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    checked: boolean;
}

const CustomCheckbox: FC<CustomCheckboxType> = ({id, label, onCheckboxChange, checked}) => {
    return (
        <div className="container_custom_checkbox">
            <input type="checkbox" id={id} onChange={onCheckboxChange} checked={checked} />
            <label htmlFor={id}>
                <span></span> {label}
            </label>
        </div>
    );
};

export default CustomCheckbox;
