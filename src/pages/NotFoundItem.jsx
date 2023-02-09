import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import routes from '../router/routes';
import './NotFoundItem.scss'

const NotFoundItem = ({title, subtitle}) => {
    const navigate = useNavigate();

    return (
        <main id='not_found_item'>
            <span class='particle'>4</span>
            <span class='particle'>4</span>
            <span class='particle'>4</span>
            <span class='particle'>4</span>
            <span class='particle'>4</span>
            <span class='particle'>4</span>
            <span class='particle'>4</span>
            <span class='particle'>4</span>
            <span class='particle'>4</span>
            <span class='particle'>4</span>
            <span class='particle'>4</span>
            <span class='particle'>4</span>
            <span class='particle'>4</span>
            <span class='particle'>4</span>
            <span class='particle'>4</span>
            <span class='particle'>4</span>
            <span class='particle'>4</span>
            <span class='particle'>4</span>
            <span class='particle'>4</span>
            <span class='particle'>4</span>
            <span class='particle'>4</span>
            <span class='particle'>4</span>
            <span class='particle'>4</span>
            <span class='particle'>4</span>
            <span class='particle'>4</span>
            <span class='particle'>4</span>
            <span class='particle'>4</span>
            <span class='particle'>4</span>
            <span class='particle'>4</span>
            <span class='particle'>4</span>
            <span class='particle'>4</span>
            <span class='particle'>4</span>
            <span class='particle'>4</span>
            <span class='particle'>4</span>
            <span class='particle'>4</span>
            <span class='particle'>4</span>
            <span class='particle'>4</span>
            <span class='particle'>4</span>
            <span class='particle'>4</span>
            <span class='particle'>4</span>
            <span class='particle'>0</span>
            <span class='particle'>0</span>
            <span class='particle'>0</span>
            <span class='particle'>0</span>
            <span class='particle'>0</span>
            <span class='particle'>0</span>
            <span class='particle'>0</span>
            <span class='particle'>0</span>
            <span class='particle'>0</span>
            <span class='particle'>0</span>
            <span class='particle'>0</span>
            <span class='particle'>0</span>
            <span class='particle'>0</span>
            <span class='particle'>0</span>
            <span class='particle'>0</span>
            <span class='particle'>0</span>
            <span class='particle'>0</span>
            <span class='particle'>0</span>
            <span class='particle'>0</span>
            <span class='particle'>0</span>
            <span class='particle'>0</span>
            <span class='particle'>0</span>
            <span class='particle'>0</span>
            <span class='particle'>0</span>
            <span class='particle'>0</span>
            <span class='particle'>0</span>
            <span class='particle'>0</span>
            <span class='particle'>0</span>
            <span class='particle'>0</span>
            <span class='particle'>0</span>
            <span class='particle'>0</span>
            <span class='particle'>0</span>
            <span class='particle'>0</span>
            <span class='particle'>0</span>
            <span class='particle'>0</span>
            <span class='particle'>0</span>
            <span class='particle'>0</span>
            <span class='particle'>0</span>
            <span class='particle'>0</span>
            <span class='particle'>0</span>
            <article class='content'>
                <p>{title}</p>
                <p>{subtitle}</p>
                <Link to={routes.home}>
                    <button>Volver al inicio.</button>
                </Link>
            </article>
        </main>

    );
}

export default NotFoundItem;
