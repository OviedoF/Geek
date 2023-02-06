import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.scss';
import routes from '../router/routes';

const NotFound = () => {
    return (
        <main id='not_found_main'>
            <section className="notFound">
                <div className="img">
                <img src="https://assets.codepen.io/5647096/backToTheHomepage.png" alt="Back to the Homepage"/>
                <img src="https://assets.codepen.io/5647096/Delorean.png" alt="El Delorean, El Doc y Marti McFly"/>
                </div>
                <div className="text">
                <h1>404</h1>
                <h2>PAGE NOT FOUND</h2>
                <Link to={routes.home}>BACK TO HOME PLEASE</Link>
                </div>
            </section>
        </main>
    );
}

export default NotFound;
