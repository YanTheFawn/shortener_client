import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

const HOST_PREFIX = 'https://been-ver.herokuapp.com'

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEnteredUrlChange = this.handleEnteredUrlChange.bind(this);
    this.state = {
      shortenedUrl: null,
      topLinks: null,
      enteredUrl: null,
    };
  }

  componentDidMount() {
    this.fetchTop100();
  }

  handleEnteredUrlChange(e) {
   this.setState({enteredUrl: e.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let { enteredUrl } = this.state;

    axios.post(`${HOST_PREFIX}/api/v1/links`, { link: {url: enteredUrl }})
    .then(response => {
      this.fetchTop100();
      let shortenedUrl = response.data.shortened_url
      this.setState({
        shortenedUrl,
        enteredUrl: '',
      });
    })
  }

  fetchTop100() {
    axios.get(`${HOST_PREFIX}api/v1/links/most_popular`)
    .then(response => {
      let topLinks = response.data
      this.setState({topLinks});
    })
  }

  renderShortenedUrl() {
    if(this.state.shortenedUrl) {
    return (
      <h1> Shortened Url Is {this.state.shortenedUrl} </h1>
    );
    }
  }

  renderTopLinks() {
    if(this.state.topLinks) {
      let { topLinks } = this.state;

      let linkItems = topLinks.map((link, i) => <li key={i}>url: {link.url} access_count: {link.access_count}</li>);

      return (
        <div>
          <div> Top 100 board </div>
          <ul>
            {linkItems}
          </ul>
        </div>
      );
    }
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
          <input id="shorten-url" placeholder="https://example.com" onChange={this.handleEnteredUrlChange}/>
          <input type="submit"/>
        </form>
        {this.renderShortenedUrl()}
        {this.renderTopLinks()}
      </div>
    );
  }
}


export default App;
