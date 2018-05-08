import React, { Component } from 'react';
import { getUserInfo } from '@/api/user';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    async componentDidMount() {
        const res = await getUserInfo();

        console.log(res);

        this.setState({
            username: res.data.username
        });
    }

    render() {
        return (
            <div>这是{this.state.username}的主页</div>
        )
    }
}

export default Main;