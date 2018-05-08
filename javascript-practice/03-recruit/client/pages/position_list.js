import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "./components/button";
import Page from './components/page';
import Header from './components/Header';
import { getAllPosition } from "@/api/user";
import Content from './components/content';

class PositionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      positionList: []
    };
  }

  async componentDidMount() {
    const res = await getAllPosition();

    console.log(res);

    this.setState({
      positionList: res.data
    });
  }

  render() {
    return (
      <Page>
        <Header>职位详情页</Header>
        {Array.isArray(this.state.positionList) &&
          this.state.positionList.map(item => (
            <Content>
              <PositionTitle>{item.type}</PositionTitle>
              <Salary>职位薪资：{item.salary}</Salary>
              <Description>经验：{item.experience}</Description>
              <Description>学历：{item.education}</Description>
              <Description>类型：{item.workType}</Description>
              <Button url={`/position/${item._id}`} value="查看详情" />
              <p>主要职责：{item.duties}</p>
            </Content>
          ))}
      </Page>
    );
  }
}

export default PositionList;

const PositionTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #000;
`;

const Salary = styled.div`
  color: red;
  font-size: 16px;
  margin: 10px 0 10px 0;
`;

const Description = styled.span`
  display: inline-block;
  margin-right: 30px;
  color: #999;
`;
