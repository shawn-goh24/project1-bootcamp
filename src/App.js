import React from "react";
import "./App.css";
import CssBaseline from '@mui/material/CssBaseline';
import MainApp from './components/MainApp'
// import Check from "./components/Check";

class App extends React.Component {
  
  render() {
    
    return (
      <div className="App">
        <CssBaseline />
        <MainApp />
      </div>
    );
  }
}

export default App;


