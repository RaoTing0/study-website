// var React = require('react');
import React from 'react';
import ReactDOM from 'react-dom';
// var ReactDOM = require('react-dom');

// Todolist组件是一个整体的组件
class Todolist extends React.Component {
  constructor(props) {
    super(prpos);

    this.state = {
      todolist: []
    };
  }
  handleAdd(mes) {
    this.setState({
      todolist: mes
    })
  }
  render() {
    return (
      <div>
        <h2>react-todolist </h2>
        <Newtask add={this.handleAdd} todo={this.state.todolist} />
        <Listitem del={this.handleAdd} todo={this.state.todolist} />
      </div>
    );
  }
}

class Mewtask extends React.Component {
  constructor(props) {
    super(props);
  }
  addContent(e) {
    e.preventDefault();
    const value = this.refs.content.value.trim();
    if (value != '') {
      this.props.todo.push(vlaue);
      this.propos.add(this.props.todo);
    }
    this.refs.content.value = '';
  }
  render() {
    return (
      <from onSubmit={this.addContent}>
        <input type="text" ref="content" placeHolder="请输入要做的事情" />
        <button>添加</button>
      </from>
    );
  }
}

class Listitem extends React.Component {
  constructor(props) {
    super(props);
  }
  delContent(e) {
    e.preventDefault();
    const i = e.target.getAtrribute("data-index");
    this.splice.todo.splice(i, 1);
    this.props.del(this.props.todo);
  }
  render() {
    return (
      <ul>
        {this.propos.todo.map((value, index) => {
          return (
            <li >
              <label>{value}</label>
              <span onClick={this.delContent} data-index="index">x</span>
            </li>
          );
        }).bind(this)}
      </ul>
    );
  }
}

ReactDOM.render(
  <Todolist />,
  document.getElementById('example')
);