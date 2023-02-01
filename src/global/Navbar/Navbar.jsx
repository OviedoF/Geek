import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import styles from "./NavBar.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faUserLargeSlash,
  faCrown,
  faHeart,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { getUserByToken } from "../../helpers/token.helper";
import { login, logout } from "../../redux/actions/auth.actions";
import { faShop, faQuestion } from "@fortawesome/free-solid-svg-icons";
import DropdownNav from "./DropdownNav";
import redirectsList from "./redirectsList";
import Notifications from "./Notifications";
import routes from '../../router/routes';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(logout());
        navigate(routes.auth);
    };

    return (
        <>
            <header className={styles.header}>
                <div className={styles.user_data}>
                    <img src={auth.userImage} alt="user" />
                    <p>@{auth.username}</p>

                    <div className={styles.icons_actions}>
                    <FontAwesomeIcon icon={faQuestion} />
                    <Notifications />
                    </div>
                </div>
                {auth.duvi && <Link to={'/mywallet'} id={styles.wallet}>Wallet: ${auth.wallet.onProperty}  <span>${auth.wallet.onWait} </span></Link>}

                <ul>
                    <li className={styles.no_modal}>
                    <Link to={redirectsList("home")}>
                        {" "}
                        <FontAwesomeIcon icon={faHome} /> Inicio{" "}
                    </Link>
                    </li>

                    <li className={styles.no_modal}>
                    <Link to={redirectsList("shoppingCart")}>
                        {" "}
                        <FontAwesomeIcon icon={faShoppingCart} /> Mi carrito{" "}
                    </Link>
                    </li>

                    <DropdownNav
                    icon={faUser}
                    text={"Mi usuario"}
                    arrayData={redirectsList("user", auth._id)}
                    />

                    {auth.shop ? (
                    <DropdownNav
                        icon={faShop}
                        text={"Mi tienda"}
                        arrayData={redirectsList("myDuvi", auth._id, auth.shop)}
                    />
                    ) : (
                    <li className={styles.no_modal}>
                        <Link to={redirectsList("shopCreate")}>
                        {" "}
                        <FontAwesomeIcon icon={faShop} /> Solicitar tienda{" "}
                        </Link>
                    </li>
                    )}

                    <DropdownNav
                    icon={faHeart}
                    text={"Mis favoritos"}
                    arrayData={redirectsList("favs", auth._id)}
                    />

                    <DropdownNav
                    icon={faShoppingCart}
                    text={"Productos"}
                    arrayData={redirectsList("products")}
                    />

                    <DropdownNav
                    icon={faShop}
                    text={"Tiendas"}
                    arrayData={redirectsList("duvis")}
                    />

                    {isAdmin && (
                    <DropdownNav
                        icon={faCrown}
                        text={"Administrador"}
                        arrayData={redirectsList("admin")}
                    />
                    )}

                    <li className={styles.no_modal}>
                        <Link to={"/"} onClick={() => handleLogout()}>
                            <FontAwesomeIcon icon={faUserLargeSlash} /> Desconectarse
                        </Link>
                    </li>
                </ul>
            </header>
            
            <Outlet />
        </>
    );
}

export default Navbar;
