import React, { Component } from 'react';
import { Menu } from 'element-react';

export default class Header extends Component {
    constructor(props, context) {
        super(props)
        this.state = {
            loading: false
        }
        // this.handleLogout = this.handleLogout.bind(this)
    }

    render() {
        return (
            <div className="header">
                <Menu theme="dark" defaultActive="1" className="el-menu-demo" mode="horizontal" onSelect={this.onSelect.bind(this)}>
                    <Menu.Item index="1">网站</Menu.Item>
                    <Menu.Item index="2">APP</Menu.Item>
                    <Menu.Item index="3">基础数据</Menu.Item>
                    <Menu.SubMenu index="4" title="小工具">
                        <Menu.Item index="4-1">选项1</Menu.Item>
                        <Menu.Item index="4-2">选项2</Menu.Item>
                        <Menu.Item index="4-3">选项3</Menu.Item>
                    </Menu.SubMenu>
                </Menu>
            </div>
        )
    }

    onSelect() {

    }
}