import React, {useEffect, useRef} from 'react';
import Resize from './components/Resize/Resize';
import PageList from './components/PageList/PageList';
import {Outlet} from 'react-router-dom';
import FooterSettings from './components/FooterSettings/FooterSettings';
import {useDispatch} from 'react-redux';
import {initTodos} from './store/todoSlice';
import {FileList} from "./components/FileList/FileList";

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchTodos() {
            const todos = await window.storeAPI.getValue('todos');
            if (todos) {
                dispatch(initTodos(todos));
            }
        }

        fetchTodos();
    }, [dispatch]);


    const sectionRef = useRef<HTMLDivElement | null>(null);
    const minWidthPane = 100;
    const maxWidthPane = window.innerWidth - minWidthPane;

    console.log(maxWidthPane)

    return (
        <div className="container-app">
            <div ref={sectionRef} className="left-container row">
                <PageList/>
                <FileList/>
                <FooterSettings/>
            </div>
            <Resize sectionRef={sectionRef} minWidthPane2={100}/>
            <div
                className="right-container row"
                style={{minWidth: `${minWidthPane}px`, maxWidth: `${maxWidthPane}px`}}
            >
                <Outlet/>
            </div>
        </div>
    );
}

export default App;
