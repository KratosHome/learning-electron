import React, {FC} from 'react';
import "./CustomCheckbox.scss"

type CustomCheckboxType = {
    id: string
    label?: any
    onCheckboxChange?: () => void;
}

const CustomCheckbox: FC<CustomCheckboxType> = ({id, label, onCheckboxChange}) => {
    return (
        <div className="container_custom_checkbox">
            <input type="checkbox" id={id} onChange={onCheckboxChange}/>
            <label htmlFor={id}>
                <span></span> {label}
            </label>
        </div>
    );
};

export default CustomCheckbox;
