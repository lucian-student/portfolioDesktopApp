import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/auth';
/*
cesta pro neprihlasene uzivatele
*/
function NotAuthRoute({ component: Component, ...rest }) {

    const { admin } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={props =>
                admin ? <Redirect to='/main' /> :
                    <Component {...props} />
            }
        />
    )
}

export default NotAuthRoute;