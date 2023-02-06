import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import NotFound from '../pages/NotFound';

const AdminRoute = ({children}) => {
    const auth = useSelector(state => state.auth);
    const [permission, setPermission] = useState(true);

    useEffect(() => {
        if(auth && auth.roles.includes('admin') ) {
            setPermission(true);
        }
    }, [])
    
    if(!permission)(
        <NotFound />
    );

    if(permission) return (
        <>
            {children}
        </>
    );
}

export default AdminRoute;
