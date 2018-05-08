import React, { Component } from 'react';
import {
    HashRouter as Router,
    // BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import { App } from 'routers';
import Login from '@/pages/login';
import Register from '@/pages/register';
import Main from '@/pages/main';
import UserList from '@/pages/user-list';
import { isLogin } from '@/utils/auth';
import PositionList from '@/pages/position_list';
import PositionDetail from './pages/position_detail';
import Resume from './pages/resume';

class Routers extends Component {

    render() {
        return (
            <Router>
                <Switch>
                   {/* <Route path="/" render={props => (
                        isLogin() ? <App /> : <Login />
                    )} />*/}
                    <Route exact path="/" component={Main} />
                    <Route path="/positionList" component={PositionList} />
                    <Route path="/position/:id" component={PositionDetail} />                    
                    <Route path="/userList" component={UserList} />
                    <Route path="/resume" component={Resume} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/error" render={(props) => <div><h1>404 Not Found!</h1></div>}/>
                    <Route path="*" render={(props) => <Redirect to='/error'/>}/>
                </Switch>
            </Router>
        )
    }
}

export default Routers;