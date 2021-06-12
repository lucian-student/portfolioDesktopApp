import React, { Fragment, useEffect, useState, useContext } from 'react';
import Menu from './components/menu';
import Login from './pages/login';
import Main from './pages/main';
import NotAuthRoute from './routes/notAuthRoute';
import AdminRoute from './routes/adminRoute';
import { AuthContext } from './context/auth';
import { HashRouter as Router, Switch } from 'react-router-dom';
function App() {
    const [loading, setLoading] = useState(true);

    const { setAdmin } = useContext(AuthContext);

    useEffect(() => {
        // validate token
        //if valid set admin
        //set laoding false
        //continue on main page
    }, [])
    return (
        <Fragment>
            <Router>
                <Menu />
                <Switch>
                    <AdminRoute exact path='/main' component={Main} />
                    <NotAuthRoute exact path='/' component={Login} />
                </Switch>
            </Router>
        </Fragment>
    )
}

export default App;