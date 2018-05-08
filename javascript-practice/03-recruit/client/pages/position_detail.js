import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Button from "./components/button";
import { getOnePosition } from "@/api/user";
import Page from './components/page';
import Header from './components/Header';
import Content from './components/content';
import BorderHeader from './components/border_header';

class PositionDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: '',
    };
  }

  async componentDidMount() {
    const positionId = this.props.match.params.id;
    const res = await getOnePosition({
      id: positionId,
    });

    console.log(res);

    this.setState({
      position: res.data[0],
    });
  }

  render() {
    const { position } = this.state;
    const duties = String(position.duties).split('；').filter( x => x);
    const requirements = String(position.requirements).split('；').filter( x => x);
    console.log(position);
    return (
      <Page>
        <Header>职位详情页</Header>
        <Title>
          <span>{position.type}</span>
          <span className="address">公司名称：{position.companyName}</span>          
          <span className="address">公司地址：{position.address}</span>
          <p className="salary">{position.salary}</p>
          <Button url={`/position`} value="我要投递"/>
        </Title>
        <Content>
          {duties && (<BorderHeader>职位描述</BorderHeader>)}
          {duties && (<ul>
            {Array.isArray(duties) && duties.map(value => (<li>{value}</li>))}
          </ul>)}
          {requirements && (<BorderHeader>任职要求</BorderHeader>)}
          {requirements && (<ul>
            {Array.isArray(requirements) && requirements.map(value => (<li>{value}</li>))}
          </ul>)}
          <BorderHeader>公司介绍</BorderHeader>
          <Introduce>
              一份精彩的公司简介能为企业带来很多好处。可以作为推广工具，吸引投资者和客户对公司产品、服务的兴趣。还可以传递给社会、媒体和其他对公司蓝图感兴趣的相关人士。公司简介应该简要、有创意并吸引人，抓住重点，用有趣的方式呈现。
          </Introduce>
        </Content>
      </Page>
    );
  }
}

export default PositionDetail;

const Title = styled.div`
  margin: 10px;
  font-size: 20px;
  font-weight: 700;
  border: 1px solid #ccc;
  padding: 20px;
  position: relative;

  .address {
    font-size: 14px;
    color: #999;
    font-weight: 400; 
    margin-left: 30px;   
  }
  .salary {
    color: red;
    font-weight: 400; 
  }
`;

const Introduce = styled.p`
  margin-top: 15px;
  line-height: 2em;
`;
