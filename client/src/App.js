import React, { Component } from 'react';
import Form from './components/Form'
import './App.css';

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      "status": "not working"
    }
  }

  getStatus = () => {
    fetch("/test")
    .then(res => res.json())
    .then(data => {
      this.setState({status: data["status"]})
    })
    console.log(this.state.status)
  }

  render() {
    this.getStatus();
    return (
    <div className="App">
      <header className="App-header">
        <p> The connection between React and Flask is {this.state.status}</p>
        <Form/>
      </header>
    </div>
    )};
}
