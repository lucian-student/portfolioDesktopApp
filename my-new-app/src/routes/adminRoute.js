/*import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/auth';*/
/*
cesta pro prihlasene uzivatele
*/
/*
function AdminRoute({ component: Component, ...rest }) {

    const { currentUser } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={props =>
                !currentUser ? <Redirect to='/' /> :
                    <Component {...props} />
            }
        />
    )
}

export default AdminRoute;*/