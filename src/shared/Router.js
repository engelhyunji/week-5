    import React from 'react';
    import { BrowserRouter, Route, Routes } from 'react-router-dom';
    import Login from '../pages/Login';
    import Join from '../pages/Join';
    import Main from '../pages/Main';
    import Voc from '../pages/voc/Voc';
    import VocView from '../pages/voc/VoicView';
    import VocQuestion from '../pages/voc/VocQuestion';

    function Router() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path='/main' element={<Main />} />
            <Route path="/" element={<Login />} />
            <Route path='/join' element={<Join />} />
            <Route path='/voc' element={<Voc />} />
            <Route path='/voc/:vocId' element={<VocView />} />
            <Route path='/voc/question' element={<VocQuestion />} />
        </Routes>
        </BrowserRouter>
    );
    }

    export default Router;
