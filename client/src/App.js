import React, { Component } from "react";
import "./App.css";

//import your components here
import Home from "./Components/Home"

class App extends Component {
    
  render() {
    return (
        <div className="App">
        <Home/>
      </div>
    );
  }
}

export default App;
