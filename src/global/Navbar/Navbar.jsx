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
    faBars,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { login, logout } from "../../redux/actions/auth.actions";
import { faShop, faQuestion } from "@fortawesome/free-solid-svg-icons";
import DropdownNav from "./DropdownNav";
import redirectsList from "./redirectsList";
import routes from '../../router/routes';
import { useNavigate } from 'react-router-dom';
import rupiasImage from '../../images/rupia.png'
import logo from '../../images/logo.webp'

const Navbar = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [responsiveNav, setResponsiveNav] = useState(false)

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(logout());
        navigate(routes.auth);
    };
    console.log(auth)

    useEffect(() => {
        if (!auth) {
            navigate(routes.auth)
            window.location.reload();
        }
        setIsAdmin(auth.roles.includes('admin'))
    }, []);

    return (
        <>
            <header className={styles.header}>
                <div className={styles.user_data}>
                    <img src={auth.userImage} alt="user" />
                    <p>@{auth.username}</p>

                    {/* <div className={styles.icons_actions}>
                    <FontAwesomeIcon icon={faQuestion} /> */}
                    {/* <Notifications /> */}
                    {/* </div> */}
                </div>
                {auth.shop && <Link to={'/mywallet'} id={styles.wallet} style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={rupiasImage} alt="rupias" className='rupia_image' style={{ height: 20, width: 15 }} />
                    <p style={{ fontSize: 20, marginLeft: 5 }}>{auth.wallet.balance}</p>
                </Link>}

                <ul>
                    <li className={styles.no_modal}>
                        <Link to={redirectsList("home")}>
                            {" "}
                            <FontAwesomeIcon icon={faHome} /> Inicio{" "}
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

            <header className={styles.header_responsive}>
                <img src={logo} alt="" />
                <FontAwesomeIcon icon={faBars} onClick={() => setResponsiveNav(true)} />

                <ul className={styles.header_responsive_navigation} style={{left: responsiveNav ? '0' : '-100%'}}>
                    <FontAwesomeIcon icon={faXmark} onClick={() => setResponsiveNav(false)} id={styles.header_responsive_navigation_close} />

                    <li className={styles.no_modal}>
                        <Link to={redirectsList("home")} onClick={() => setResponsiveNav(false)}>
                            {" "}
                            <FontAwesomeIcon icon={faHome} /> Inicio{" "}
                        </Link>
                    </li>

                    <DropdownNav
                        action={() => setResponsiveNav(false)}
                        icon={faUser}
                        text={"Mi usuario"}
                        arrayData={redirectsList("user", auth._id)}
                    />

                    {auth.shop ? (
                        <DropdownNav
                            action={() => setResponsiveNav(false)}
                            icon={faShop}
                            text={"Mi tienda"}
                            arrayData={redirectsList("myDuvi", auth._id, auth.shop)}
                        />
                    ) : (
                        <li className={styles.no_modal}>
                            <Link to={redirectsList("shopCreate")} onClick={() => setResponsiveNav(false)}>
                                {" "}
                                <FontAwesomeIcon icon={faShop} /> Solicitar tienda{" "}
                            </Link>
                        </li>
                    )}

                    <DropdownNav
                        action={() => setResponsiveNav(false)}
                        icon={faShoppingCart}
                        text={"Productos"}
                        arrayData={redirectsList("products")}
                    />

                    <DropdownNav
                        action={() => setResponsiveNav(false)}
                        icon={faShop}
                        text={"Tiendas"}
                        arrayData={redirectsList("duvis")}
                    />

                    {isAdmin && (
                        <DropdownNav
                            action={() => setResponsiveNav(false)}
                            icon={faCrown}
                            text={"Administrador"}
                            arrayData={redirectsList("admin")}
                        />
                    )}

                    <li className={styles.no_modal} onClick={() => setResponsiveNav(false)}>
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
