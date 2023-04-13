import React, {useEffect, useLayoutEffect, useState} from 'react';

const Inbox = () => {
    const [data, setData] = useState('');

    useEffect(() => {
        async function fetchData() {
            const storedData = await window.storeAPI.getValue('myData');
            const test = await window.storeAPI
            console.log(test)
            setData(storedData || '');
        }

        fetchData();


    }, []);

    const saveData = async () => {
        await window.storeAPI.setValue('myData', data);
    };


    return (
        <div>
            inbox
        </div>
    );
};

export default Inbox;
