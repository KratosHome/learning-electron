import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import "./normalize.scss"
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Calendar from "./pages/Calendar/Calendar";
import Inbox from "./pages/inbox/inbox";
import {store} from './store/store';
import {Provider} from 'react-redux'
import MarkdownViewer from './pages/MarkdownViewer/MarkdownViewer';
import ImageViewer from './pages/ImageViewer/ImageViewer';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Inbox/>,
            },
            {
                path: "/calendar",
                element: <Calendar/>,
            },
            {
                path: "/markdown/:file",
                element: <MarkdownViewer/>,
            },
            {
                path: "/image/:file",
                element: <ImageViewer/>,
            },
        ],
    },
]);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
