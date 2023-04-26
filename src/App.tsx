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
    const minWidthPane1 = 100;
    const minWidthPane2 = 500;
    const maxWidthPane2 = window.innerWidth - minWidthPane1;


    return (
        <div className="container-app">
            <div ref={sectionRef} className="left-container row">
                <PageList/>
                <FileList/>
                <FooterSettings/>
            </div>
            <Resize sectionRef={sectionRef} minWidthPane2={minWidthPane2}/>
            <div
                className="right-container row"
                style={{minWidth: `${minWidthPane2}px`, maxWidth: `${maxWidthPane2}px`}}
            >
                <Outlet/>
            </div>
        </div>
    );
}

export default App;

/*

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


 */
