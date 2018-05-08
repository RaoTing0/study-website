import React, { Component } from 'react';
import styled from 'styled-components';

import { userResume } from '@/api/user';
import Page from './components/page';
import Header from './components/Header';
import Content from './components/content';

class Resume extends Component {
    constructor(props) {
        super(props);

        this.state = {
          resume: ''
        };
    }

    async componentDidMount() {
        const res = await userResume({
          account: '15591616652'
        });

        console.log(res);

        if (res.data) {
            this.setState({
                resume: res.data,
            });
        }
    }

    render() {
        const { resume } = this.state;
        return (
            <Page>
                <Header>个人简历</Header>
                <BorderHeader>个人信息</BorderHeader>
                <Content>
                    <Info keys="姓名：" value={resume.name} />
                    <Info keys="性别：" value={resume.gender} />
                    <Info keys="年龄：" value={resume.age} />
                    <Info keys="电话：" value={resume.mobile} />
                    <Info keys="邮箱：" value={resume.email} />                    
                </Content>
                <BorderHeader>教育背景</BorderHeader>
                <Content>
                    <Info keys="毕业院校：" value={resume.education} />
                    <Info keys="教育背景：" value={resume.educationBackground} />                    
                </Content>
                <BorderHeader>项目经验</BorderHeader>
                <Content>
                    {resume.projectExperience}                    
                </Content>
                <BorderHeader>工作经历</BorderHeader>
                <Content>
                    {resume.workExperience}                    
                </Content>
            </Page>
        )
    }
}

const Info = ( {keys, value} ) => (
    <InfoContainer>
        <span style={{ color: '#999' }}>{keys}</span>
        <span>{value}</span>
    </InfoContainer>
)

export default Resume;

const InfoContainer = styled.div`
    line-height: 2em;
`;

const BorderHeader = styled.div`
  border-left: 5px solid #38b447;
  padding-left: 10px;
  font-weight: 700;
  margin: 20px 0 0 10px;
`;