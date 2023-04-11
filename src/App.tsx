// App.tsx
import React, {useRef} from 'react';
import Resize from './components/Resize/Resize';
import PageList from "./components/PageList/PageList";
import {Outlet} from 'react-router-dom';

function App() {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const minWidthPane1 = 100;
    const minWidthPane2 = 500;
    const maxWidthPane2 = window.innerWidth - minWidthPane1;

    return (
        <div className="container-app">
            <div ref={sectionRef}>
                <PageList/>
            </div>
            <Resize sectionRef={sectionRef} minWidthPane2={minWidthPane2}/>
            <div style={{minWidth: `${minWidthPane2}px`, maxWidth: `${maxWidthPane2}px`}}>
                <Outlet/>
            </div>
        </div>
    );
}

export default App;
