import React, { Component } from 'react';
import { getUserList, userRegister, userLogin, userResume } from '@/api/user';
import { getAllPosition, putResume, completeResume, updateResume, addPosition, updatePosition } from '../api/user';

class UserList extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    async componentDidMount() {

        // 测试用户登录接口
        // const r = await userLogin({
        //     account: '15591616652',
        //     password: '12356'
        // });
        // console.log(r);

        // 测试获取用户简历接口
        const re = await userResume({
            account: '13399999999',
        });
        console.log(re);
        // 投递简历
        const resumeId = re._id;
        const resumeRes = await putResume({
            id: resumeId
        })
        console.log(resumeRes);

        // 测试获取所有用户接口
        const res = await getUserList();

        console.log(res);

        this.setState({
            data: res.data
        });
        // 测试添加职位接口
        // const positionData ={
        //     companyName: '欣欣向荣',
        //     legalPerson: '向荣',
        //     address: '汉中市汉台区',
        //     requirements: '1.深入理解面向对象的Java软件项目设计与开发；精通Java、Java EE技术，对Java语言规范有深刻理解；精通SQL，熟悉mysql，oracle，hive；熟悉js、jquery、html等技术的开发；熟悉Spring、Hibernate、MyBatis等框架；掌握常用的开发工具（如Eclipse、SVN等）；善于学习及了解新技术，具有较强的分析、解决应用问题的能力；思维清晰，逻辑性好，理解能力强',
        //     duties: '负责公司网站维护；日常维护及开发工作；',
        //     publishDate: '2018-4-22',
        //     type: 'java高级工程师',
        // };
        // const positionRes = await addPosition(positionData);
        // console.log(positionData);
    }

    async register() {
        // 测试用户注册接口
        const response = await userRegister({
            account: '15591616652',
            password: '123456'
        });
        console.log(response);
    }

    async getPosition() {
        const res = await getAllPosition();
        console.log(res);
        const positionId = res.data[0]._id;

        // 测试获取用户简历接口
        const re = await userResume({
            account: '13399999999',
        });
        console.log(re);
        // 更新简历

        // const resumeId = re.data._id;        
        // const resumeData = {
        //     _id: resumeId,
        //     name: '爱漏油',
        // }
        // const updateRes = await updateResume(resumeData);
        // console.log(updateRes);

        // 投递简历
        // const resumeId = re.data._id;
        // console.log(resumeId, positionId);
        // const resumeRes = await putResume({
        //     resumeId: resumeId,
        //     positionId: positionId
        // })
        // console.log(resumeRes);

        // 测试更新职位接口
        const upDate = {
            _id: positionId,
            companyName: '欣欣',
        }
        const updatePositionRes = await updatePosition(upDate);
        console.log(updatePositionRes);
    }

    render() {
        return (
            <div> { this.state.data && this.state.data.map(item => {
              return (
                <p key={item._id}>{item._id}</p>
              )
            })}
            <p onClick={this.register}>注册</p>
            <p onClick={this.getPosition}>获取职位</p>
            </div>
        )
    }
}

export default UserList;