import React, {useEffect} from 'react';
import PageList from './components/PageList/PageList';
import {Outlet} from 'react-router-dom';
import FooterSettings from './components/FooterSettings/FooterSettings';
import {useDispatch} from 'react-redux';
import {initTodos} from './store/todoSlice';
import {FileList} from './components/FileList/FileList';
import {Panel, PanelGroup} from "react-resizable-panels";
import ResizeHandle from './components/UI/ResizeHandle/ResizeHandle';

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

    return (
        <div className="container-app container_resize">
            <PanelGroup direction="horizontal">
                <Panel className="Panel" defaultSize={20} order={1}>
                    <div className="PanelContent">
                        <div className="left-container row">
                            <PageList/>
                            <FileList/>
                            <FooterSettings/>
                        </div>
                    </div>
                </Panel>
                <ResizeHandle/>
                <Panel className="Panel" order={2}>
                    <div className="PanelContent">
                        <div className="right-container row">
                            <Outlet />
                        </div>
                    </div>
                </Panel>
            </PanelGroup>
        </div>
    );
}

export default App;
