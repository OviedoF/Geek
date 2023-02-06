import { createContext, useState } from "react";

const ShippingBuysContext = createContext();

const initialContext = {
    stateOfProduct: 'Esperando afirmación',
    products: [],
};

const ShippingRemoteContextProvider = ({children, products}) => {
    const [shippingBuysData, setShippingBuysData] = useState(initialContext);

    const handleContext = (key, value) => {
        setShippingBuysData({
            ...shippingBuysData,
            [key]: value
        })
    }

    const data = {shippingBuysData, handleContext};

    return (
        <ShippingBuysContext.Provider value={data}>
            {children}
        </ShippingBuysContext.Provider>
    );
};

export { ShippingRemoteContextProvider };
export default ShippingBuysContext;