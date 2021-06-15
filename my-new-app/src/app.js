import React, { Fragment, useEffect, useState, useContext } from 'react';
import Menu from './components/menu';
import Login from './pages/login';
import Main from './pages/main';
import ProjectForm from './pages/projectForm';
import Loading from './pages/loading';
import NotAuthRoute from './routes/notAuthRoute';
import AdminRoute from './routes/adminRoute';
import { AuthContext } from './context/auth';
import { HashRouter as Router, Switch } from 'react-router-dom';
import validate from './queries/token/validate';
function App() {
    const [loading, setLoading] = useState(true);

    const { setAdmin, source } = useContext(AuthContext);

    useEffect(() => {
        // validate token
        //if valid set admin
        //set laoding false
        //continue on main page
        const validateData = async () => {
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
                await validate(accessToken, setAdmin, setLoading, source);
            } else {
                setLoading(false);
            }
        }
        validateData();
    }, [setAdmin])
    return (
        <Fragment>
            {loading ? (
                <Fragment>
                    <Loading />
                </Fragment>
            ) : (
                <Router>
                    <Menu />
                    <Switch>
                        <AdminRoute exact path='/main' component={Main} />
                        <AdminRoute exact path='/project_form' component={ProjectForm} />
                        <NotAuthRoute exact path='/' component={Login} />
                    </Switch>
                </Router>
            )}
        </Fragment>
    )
}

export default App;