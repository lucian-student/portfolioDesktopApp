import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/auth';
/*
cesta pro prihlasene uzivatele
*/

function AdminRoute({ component: Component, ...rest }) {

    const { admin } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={props =>
                !admin ? <Redirect to='/' /> :
                    <Component {...props} />
            }
        />
    )
}

export default AdminRoute;