import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Gökay <code>src/App.js</code> and Ay.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div><Button variant="contained" color="primary">
      Hello World
    </Button></div>
      </header>
    </div>
  );
}

export default App;