import React from 'react';
import CategorySelect from '../components/Home/CategorySelect';
import TradersView from '../components/Home/TradersView';

const Home = () => {
    return (
        <main>
            <CategorySelect />
            <TradersView />
        </main>
    );
}

export default Home;
