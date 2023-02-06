import React from 'react';
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
import FavsShops from '../pages/user/FavsShops';
import FavsProducts from '../pages/user/FavsProducts';
import ViewProducts from '../pages/products/ViewProducts';
import ViewShops from '../pages/Shop/ViewShops';
import NotFound from '../pages/NotFound';
import AdminRoute from './AdminRoute';
import CreateCategory from '../pages/admin/CreateCategory';
import CreateSubCategory from '../pages/admin/CreateSubCategory';
import Messages from '../pages/admin/Messages';

const AppRouter = () => {
    return (
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

                    {/* rutas del usuario */}
                    <Route exact path = {routes.user}  element = {<UserPage />} />
                    <Route exact path = {routes.follows} element = {<FollowsPage />} />
                    <Route exact path = {routes.wishlist}  element = {<WishListPage />} />
                    <Route exact path={routes.shopsFavs} element={<FavsShops />} />
                    <Route exact path={routes.productsFavs} element={<FavsProducts />} />

                    {/* rutas de productos */}
                    <Route exact path={routes.products} element={<ViewProducts />} />

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
