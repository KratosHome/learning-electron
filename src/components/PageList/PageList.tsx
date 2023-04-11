import React from 'react';
import { Link } from 'react-router-dom';

const PageList = () => {

    return (
        <>
            <ul>
                <li>
                    <Link to="/">Index</Link>
                </li>
                <li>
                    <Link to="/Calendar">Calendar</Link>
                </li>
            </ul>
        </>
    );
};

export default PageList;
