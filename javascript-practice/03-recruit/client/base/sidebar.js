import React, { Component } from 'react';
import { Layout, Menu } from 'element-react';
import { Link } from 'react-router-dom';

// {
//     name: '流量渠道',
//     url: 'website/flow',
//     children: [
//         { name: 'seo流量', url: 'website/flow/seo' },
//         { name: '搜索引擎流量', url: 'website/flow/search' }
//     ]
// }

const allMenu = [{
    name: '总览',
    url: 'website/overview',
}, {
    name: '渠道流量',
    url: 'website/flow/seo',
}, {
    name: '搜索引擎流量',
    url: 'website/flow/search',
}, {
    name: '主要页面',
    url: 'website/main',
}, {
    name: '趋势图',
    url: 'website/trend',
}];

export default class Sidebar extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            current: 'website/overview'
        }
    }

    componentDidMount() {
        console.log(this.props);
    }

    componentWillMount() {

    }

    onOpen() {

    }

    onClose() {

    }

    onSelect(path, paths) {
        this.setState({
            current: path,
        });
    }

    render() {
        return (
            <div className="sidebar">
                <Menu defaultActive={this.state.current} className="el-menu-vertical" onOpen={this.onOpen.bind(this)} onClose={this.onClose.bind(this)} onSelect={this.onSelect.bind(this)}  theme="light">
                    {
                        allMenu.map((subMenu) => {
                            if (subMenu.children && subMenu.children.length) {
                                return (
                                    <Menu.SubMenu key={subMenu.url}  index={subMenu.url} title={<span><span>{subMenu.name}</span></span>}>
                                        {subMenu.children.map(menu => (
                                        <Menu.Item key={menu.url} index={menu.url}><Link to={`/${menu.url}`}>{menu.name}</Link></Menu.Item>))}
                                    </Menu.SubMenu>
                                )
                            }
                            return (
                                <Menu.Item key={subMenu.url} index={subMenu.url}>
                                    <Link to={`/${subMenu.url}`}>
                                        <span className="nav-text">{subMenu.name}</span>
                                    </Link>
                                </Menu.Item>
                            )
                        })
                    }
                </Menu>
            </div>
        )
    }
}