import { Component } from 'react/cjs/react.production.min';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      githubUsername: "",
      repoError: false,
      repoInfo: []
    };
  }

  handleUsernameChange(event) {
    this.setState({
      githubUsername: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const config = {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    };
    axios.get(`https://api.github.com/users/${this.state.githubUsername}/repos`, config)
      .then(res => {
        this.setState({ 
          repoError: false, 
          repoInfo: res.data,
          githubUsername: "" });
      }).catch(_err => {
        this.setState({ repoError: true, repoInfo: [], githubUsername: "" });
      });
  }

  renderError() {
    return (
      <div>
        <h2>This username doesn't have any repository</h2>
      </div>
    );
  }

  renderRepositoryList() {
    return (
      <ul>
        <li className='repo-list-item'>
          Repository fullname - Repository stars
        </li>
        {
          this.state.repoInfo.map((item, index) => {
            return (
              <li className='repo-list-item' key={index}>
                {item.full_name} - {item.stargazers_count}
              </li>
            )
          })
        }
      </ul>
    );
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input
            type="text"
            placeholder="Type your github username"
            value={this.state.githubUsername}
            onChange={this.handleUsernameChange.bind(this)} />
          <input type="submit" value="Send" />
        </form>
        { this.state.repoError ? 
          this.renderError() : 
          this.renderRepositoryList()
        }
      </div>
    );
  }

}

export default App;
