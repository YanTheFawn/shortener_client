import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'


class App extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    debugger;
    axios.post('http://localhost:3003/api/v1/links', { link: {url: 'https://www.google.com' }})
    .then(response => {
      debugger;
      response;
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to the Url Shortener App</h1>
        </header>
        <p className="App-intro">
          Enter a url (including 'https://') and click submit to have it shortened.
        </p>
        <form onSubmit={this.handleSubmit}>
          <input id="shorten-url" placeholder="https://example.com"/>
          <input type="submit"/>
        </form>
      </div>
      
    );
  }
}

function ShortenedUrl(props) {
  return (
    <h1> Shortened Url Here </h1>
  );
}

export default App;
