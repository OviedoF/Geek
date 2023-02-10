import React, { useEffect, useState } from 'react';
import {Route, Routes, HashRouter} from 'react-router-dom';
import routes from './routes';
import AuthPage from '../pages/AuthPage';
import Navbar from '../global/Navbar/Navbar';
import Home from '../pages/Home';
import RequestShop from '../pages/RequestShop';
import MyShop from '../pages/MyShop';
import EditShop from '../pages/Shop/EditShop';
import CreateProduct from '../pages/Shop/CreateProduct';
import UserPage from '../pages/user/UserPage';
import FollowsPage from '../pages/user/FollowsPage';
import WishListPage from '../pages/user/WishListPage';
import FavsProducts from '../pages/user/FavsProducts';
import ViewProducts from '../pages/products/ViewProducts';
import ViewShops from '../pages/Shop/ViewShops';
import NotFound from '../pages/NotFound';
import AdminRoute from './AdminRoute';
import CreateCategory from '../pages/admin/CreateCategory';
import CreateSubCategory from '../pages/admin/CreateSubCategory';
import Messages from '../pages/admin/Messages';
import ProductPage from '../pages/products/ProductPage';
import ProductsByCategory from '../pages/products/ProductsByCategory';
import ShopPage from '../pages/Shop/ShopPage'
import Wallet from '../pages/user/Wallet';
import env from '../env';
import { login } from '../redux/actions/auth.actions';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const AppRouter = () => {
    const [logged, setLogged] = useState(false);
    const dispatch = useDispatch();
    const [status, setStatus] = useState({status: 'idle'});
    const [finished, setFinished] = useState(false);

    const getUserInfo = (token) => {
        axios.post(`${env.API_URL}/auth/login/identifyUser`, {token})
            .then(res => {
                localStorage.setItem('token', token);
                dispatch(login({
                    token,
                    ...res.data
                }));
                setLogged(true);
                setFinished(true)
            })
            .catch(err => {
                setStatus({
                    status: 'error',
                    message: err.response.data.message
                })
                setFinished(true)
            });
    } 

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(token) {
            getUserInfo(token);
        } else {
            setFinished(true)
        }
    }, []);

    if(finished) return (
        <HashRouter>
            <Routes>
                <Route exact path={routes.auth} element={<AuthPage />} />

                <Route element={<Navbar />}>
                    <Route exact path={routes.home} element={<Home />} />

                    {/* rutas de tiendas */}
                    <Route exact path={routes.requestShop} element={<RequestShop />} />
                    <Route exact path={routes.shop} element={<MyShop />} />
                    <Route exact path = {routes.editShop} element = {<EditShop />} />
                    <Route exact path = {routes.createProduct} element = {<CreateProduct />} />
                    <Route exact path={routes.viewShops} element={<ViewShops />} />
                    <Route exact path={`${routes.shop}/:id`} element={<ShopPage />} />

                    {/* rutas del usuario */}
                    <Route exact path = {routes.user}  element = {<UserPage />} />
                    <Route exact path = {routes.follows} element = {<FollowsPage />} />
                    <Route exact path = {routes.wishlist}  element = {<WishListPage />} />
                    <Route exact path={routes.productsFavs} element={<FavsProducts />} />
                    <Route exact path={routes.myWallet} element={<Wallet />} />

                    {/* rutas de productos */}
                    <Route exact path={routes.products} element={<ViewProducts />} />
                    <Route exact path={`${routes.product}/:id`} element={<ProductPage />} />
                    <Route exact path={`${routes.products}/:category/:page`} element={<ProductsByCategory />} />

                    {/* rutas administrador */}
                    <Route exact path={routes.createCategory} element={
                        <AdminRoute>
                            <CreateCategory />
                        </AdminRoute>
                    } />

                    
                    <Route exact path={routes.createSubcategory} element={
                        <AdminRoute>
                            <CreateSubCategory />
                        </AdminRoute>
                    } />

                    <Route exact path={routes.messages} element={
                        <AdminRoute>
                            <Messages />
                        </AdminRoute>
                    } />

                </Route>

                {/* 404 */}
                <Route path='*' element={<NotFound />} />
            </Routes>
        </HashRouter>
    );
}

export default AppRouter;
