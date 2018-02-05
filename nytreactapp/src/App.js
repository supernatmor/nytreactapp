import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Jumbotron from "./components/Jumbotron";
import Display from "./components/Display";
import Search from "./components/Search";
import Saved from "./components/Saved";


class App extends Component {
  render() {
    return (
      <div className = "container"> 
        <Jumbotron />
        <Search />
        <Display />
        <Saved />
      
      </div>
    );
  }
}

export default App;
