import React from 'react';

const data = [
    {
        "id": 1682057751986,
        "date": "2023-04-07T21:00:00.000Z",
        "timeStart": "2023-04-07T21:00:00.000Z",
        "timeEnd": "2023-04-07T21:00:00.000Z",
        "timer": 1,
        "title": "New todo",
        "text": "New todo",
        "pathMD": "New todo",
        "completed": false,
        "notifications": true,
        "delete": false,
        subTodo: [
            {
                id: 1,
                "date": "2023-04-07T21:00:00.000Z",
                "timeStart": "2023-04-07T21:00:00.000Z",
                "timeEnd": "2023-04-07T21:00:00.000Z",
                "timer": 1,
                "title": "New todo",
                "text": "New todo",
                "pathMD": "New todo",
                "completed": false,
                "notifications": true,
                "delete": false,
            }
        ]
    }
]

const Inbox = () => {
    return (
        <div className="container_inbox">
            <div>add task (add tim start time continua)</div>
            <div>focus</div>
            <div>
                <div>All task</div>
                <div>со срокм</div>
                <div>без срока</div>
            </div>
            <div>completed</div>
        </div>
    );
};

export default Inbox;
