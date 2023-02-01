import React from 'react';
import {Route, Routes, HashRouter} from 'react-router-dom';
import routes from './routes';
import AuthPage from '../pages/AuthPage';
import Navbar from '../global/Navbar/Navbar';
import Home from '../pages/Home';
import RequestShop from '../pages/RequestShop';
import MyShop from '../pages/MyShop';
import EditShop from '../pages/Shop/EditShop';

const AppRouter = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path={routes.auth} element={<AuthPage />} />

                <Route element={<Navbar />}>
                    <Route path={routes.home} element={<Home />} />
                    <Route path={routes.requestShop} element={<RequestShop />} />
                    <Route path={routes.shop} element={<MyShop />} />
                    <Route path = {routes.editShop} element = {<EditShop />} />
                </Route>
            </Routes>
        </HashRouter>
    );
}

export default AppRouter;
