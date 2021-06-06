import React, { Fragment } from 'react';
import Menu from './components/menu';
import Login from './pages/login';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
function App() {


    return (
        <Fragment>
            <Router>
                <Menu />
                <Switch>
                    <Login />
                </Switch>
            </Router>
        </Fragment>
    )
}

export default App;