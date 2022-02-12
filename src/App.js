import { Component } from 'react/cjs/react.production.min';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      githubUsername: "",
      repoNumber: 0
    };
  }

  handleUsernameChange(event) {
    this.setState({
      githubUsername: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    // TODO install axios
    // TODO call github API and change the repoNumber state property  
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input 
            type="text"
            placeholder="Type your github username"
            onChange={this.handleUsernameChange.bind(this)} />
          <input type="submit" value="Send"/>
        </form>
        <div>
          <h2>{this.state.repoNumber}</h2>
        </div>
      </div>
    );
  }
  
}

export default App;
