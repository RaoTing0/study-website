import React, { Component } from 'react';
import {
    Route,
    NavLink,
    Switch,
    Redirect
} from 'react-router-dom';

import Header from './header';
import Sidebar from './sidebar';
import { Website } from 'routers';

export default class App extends Component {
    constructor(props, context) {
        super(props);
    }

    // 组件已经加载到dom中
    componentDidMount() {

    }

    componentWillMount() {

    }

    render() {
        const { location, children } = this.props;
        return (
            <div id="wrapper" className="wrapper">
                <Header />
                <Sidebar />
                <div className="container">
                    <Route path="/base" component={Website} />
                    <Route path="/app" component={Website} />
                    <Route path="/website" component={Website} />
                    <Route exact path="/" component={Website} />
                    {children}
                </div>
            </div>
        )
    }
}