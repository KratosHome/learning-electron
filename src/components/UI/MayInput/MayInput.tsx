import React, {FC} from 'react';
import "./MayInput.scss"

type MayInputType = {
    translate: any
    value: string
    onChange: any
}


const MayInput: FC<MayInputType> = ({
                                        value,
                                        translate,
                                        onChange
                                    }) => {
    return (
        <>
            <input
                className="may_input"
                type="text"
                placeholder={translate}
                value={value}
                onChange={onChange}
            />
        </>
    );
};

export default MayInput;
