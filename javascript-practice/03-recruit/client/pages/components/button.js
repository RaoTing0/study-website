import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Button = (props) => (
  <Detail>
    <Link to={props.url} className="link">{props.value}</Link>
  </Detail>
)

export default Button;

const Detail = styled.button`
  border: none;
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px;
  background: #38b447;
  color: #fff;
  outline-style: none;
  border-radius: 3px;

  &&:hover {
    background: #3ec74f;
  }

  .link {
    color: #fff;
    text-decoration: none;
  }
`;